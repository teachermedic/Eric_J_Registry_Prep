"""Refresh the published blog snapshot without a browser-side RSS proxy."""
import json
import os
import re
import sys
import urllib.request
from urllib.error import HTTPError, URLError
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT = ROOT / 'blog-posts.json'
BLOG = 'https://ericjm.substack.com/'


def safe_url(value, post=False):
    try:
        u = urlparse(value or '')
        return value if u.scheme == 'https' and u.hostname and not u.username and not u.password and (not post or u.hostname == 'ericjm.substack.com') else ''
    except (ValueError, TypeError):
        return ''


class Content(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.text, self.images, self.meta, self.skip = [], [], {}, 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('script', 'style'):
            self.skip += 1
        if tag == 'img' and safe_url(a.get('src')):
            self.images.append(a['src'])
        if tag == 'meta':
            self.meta[a.get('property', a.get('name', ''))] = a.get('content', '')
        if tag in ('p', 'br', 'div'):
            self.text.append(' ')

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip = max(0, self.skip - 1)
        if tag in ('p', 'div'):
            self.text.append(' ')

    def handle_data(self, data):
        if not self.skip:
            self.text.append(data)


def clean(value):
    p = Content()
    p.feed(value or '')
    return re.sub(r'\s+', ' ', ''.join(p.text)).strip(), p


def stamp(value):
    try:
        d = parsedate_to_datetime(value)
        if d.tzinfo is None:
            d = d.replace(tzinfo=timezone.utc)
        return d.astimezone(timezone.utc).isoformat()
    except (ValueError, TypeError, OverflowError):
        return ''


def parse_feed(xml):
    root = ET.fromstring(xml)
    posts = []
    for item in root.findall('./channel/item'):
        link = safe_url(item.findtext('link'), post=True)
        date = stamp(item.findtext('pubDate'))
        if not link or not date:
            continue
        raw = item.findtext('description') or item.findtext('{http://purl.org/rss/1.0/modules/content/}encoded') or ''
        excerpt, content = clean(raw)
        images = [n.get('url') for n in item.findall('enclosure') if (n.get('type') or '').startswith('image/')]
        images += [n.get('url') for n in item.findall('{http://search.yahoo.com/mrss/}content') if (n.get('medium') == 'image' or (n.get('type') or '').startswith('image/'))]
        images += [n.get('url') for n in item.findall('{http://search.yahoo.com/mrss/}thumbnail')]
        images += content.images
        posts.append({'link': link, 'title': item.findtext('title') or 'Read the Field Notes', 'excerpt': excerpt[:220], 'image': next((safe_url(x) for x in images if safe_url(x)), ''), 'date': date})
    return sorted(posts, key=lambda p: p['date'], reverse=True)


def select_snapshot(posts, previous):
    if not posts:
        raise ValueError('Feed has no valid posts; preserving the published card.')
    old = (previous.get('posts') or [{}])[0]
    # The supplied article is the initial baseline. Do not replace it with a stale proxy/feed.
    if old.get('date'):
        if posts[0]['date'] < old['date']:
            raise ValueError('Feed is older than the published card.')
    elif old.get('link') and not any(p['link'].rstrip('/') == old['link'].rstrip('/') for p in posts):
        raise ValueError('Feed does not yet include the supplied article; preserving it.')
    for p in posts:
        if p['link'] == old.get('link') and not p.get('image'):
            p['image'] = old.get('image', '')
    return {'posts': posts[:5]}


def read_url(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'EricJsHearth-BlogPreview/1.0'})
    with urllib.request.urlopen(request, timeout=30) as response:
        data = response.read(4 * 1024 * 1024 + 1)
        if len(data) > 4 * 1024 * 1024:
            raise ValueError('Response exceeds limit.')
        return data.decode('utf-8')


def manual_snapshot(values, previous):
    link = safe_url(values.get('url'), post=True)
    title = (values.get('title') or '').strip()
    excerpt = (values.get('description') or '').strip()
    image = safe_url(values.get('image'))
    if not link or not urlparse(link).path.startswith('/p/'):
        raise ValueError('Enter the HTTPS Substack article URL under ericjm.substack.com/p/.')
    if not title or len(title) > 300:
        raise ValueError('Enter a post title of 1–300 characters.')
    if not excerpt or len(excerpt) > 220:
        raise ValueError('Enter a brief description of 1–220 characters.')
    if not image:
        raise ValueError('Enter the public HTTPS URL of this post’s image.')
    date = ''
    if values.get('date', '').strip():
        try:
            d = datetime.fromisoformat(values['date'].strip().replace('Z', '+00:00'))
            if d.tzinfo is None:
                raise ValueError()
            date = d.astimezone(timezone.utc).isoformat()
        except ValueError:
            raise ValueError('Use a publication timestamp with timezone, for example 2026-10-30T12:00:00Z.')
    post = {'link': link, 'title': title, 'excerpt': excerpt, 'image': image, 'date': date}
    others = [p for p in previous.get('posts', []) if p.get('link', '').rstrip('/') != link.rstrip('/')]
    return {'posts': [post, *others[:4]]}


EXPECTED_FEED_ERRORS = (HTTPError, URLError, TimeoutError, ConnectionError, UnicodeError, ET.ParseError, ValueError)


def refresh(snapshot_path=SNAPSHOT, read=read_url, manual=None):
    # Invalid local data is a real error, not a successful skipped fetch.
    original = snapshot_path.read_text(encoding='utf-8')
    previous = json.loads(original)
    if not isinstance(previous, dict) or not isinstance(previous.get('posts'), list):
        raise ValueError('The saved blog snapshot is invalid.')
    if manual:
        snapshot = manual_snapshot(manual, previous)
        message = 'Manual article preview saved.'
    else:
        try:
            posts = parse_feed(read(BLOG + 'feed'))
            snapshot = select_snapshot(posts, previous)
        except EXPECTED_FEED_ERRORS as exc:
            reason = 'HTTP ' + str(exc.code) if isinstance(exc, HTTPError) else str(exc)
            return {'outcome': 'unavailable', 'changed': False,
                    'message': 'Blog NOT updated: ' + reason + '. Existing article preserved. Use Run workflow with the post fields for a manual update.'}
        # Metadata is optional: a failed article request does not discard valid feed data.
        try:
            _, page = clean(read(posts[0]['link']))
            cover = safe_url(page.meta.get('og:image'))
            description, _ = clean(page.meta.get('og:description') or page.meta.get('description'))
            if cover:
                snapshot['posts'][0]['image'] = cover
            if description:
                snapshot['posts'][0]['excerpt'] = description[:220]
        except EXPECTED_FEED_ERRORS:
            pass
        message = 'Automatic feed check completed.'
    content = json.dumps(snapshot, ensure_ascii=False, indent=2) + '\n'
    changed = snapshot != previous
    if changed:
        temp = snapshot_path.with_suffix('.tmp')
        temp.write_text(content, encoding='utf-8')
        temp.replace(snapshot_path)
    return {'outcome': 'updated' if changed else 'unchanged', 'changed': changed,
            'message': message + (' Preview changed.' if changed else ' No change needed.')}


def report(result):
    # Do not put external text into workflow commands or interpolate it into a shell.
    print(json.dumps(result, ensure_ascii=False))
    if os.environ.get('GITHUB_OUTPUT'):
        with open(os.environ['GITHUB_OUTPUT'], 'a', encoding='utf-8') as output:
            output.write('changed=' + str(result['changed']).lower() + '\n')
            output.write('outcome=' + result['outcome'] + '\n')
    if os.environ.get('GITHUB_STEP_SUMMARY'):
        with open(os.environ['GITHUB_STEP_SUMMARY'], 'a', encoding='utf-8') as summary:
            summary.write('### Blog preview refresh\n\n')
            summary.write('Status: **' + result['outcome'] + '**\n\n')
            # HTML escaping prevents upstream strings from becoming links/markup.
            from html import escape
            summary.write('<pre>' + escape(result['message']) + '</pre>\n')


def main():
    manual = None
    if os.environ.get('BLOG_POST_URL', '').strip():
        manual = {key: os.environ.get(env, '').strip() for key, env in {
            'url': 'BLOG_POST_URL', 'title': 'BLOG_POST_TITLE',
            'description': 'BLOG_POST_DESCRIPTION', 'image': 'BLOG_POST_IMAGE',
            'date': 'BLOG_POST_DATE'}.items()}
    report(refresh(manual=manual))


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print('Blog refresh error; existing preview preserved:', str(exc), file=sys.stderr)
        sys.exit(1)
