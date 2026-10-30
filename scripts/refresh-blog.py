"""Refresh the published blog snapshot without a browser-side RSS proxy."""
import json
import re
import sys
import urllib.request
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
    return sorted(posts, key=lambda p: p['date'], reverse=True)[:5]


def select_snapshot(posts, previous):
    if not posts:
        raise ValueError('Feed has no valid posts; preserving the published card.')
    old = previous.get('posts', [{}])[0]
    # The supplied article is the initial baseline. Do not replace it with a stale proxy/feed.
    if old.get('date'):
        if posts[0]['date'] < old['date']:
            raise ValueError('Feed is older than the published card.')
    elif old.get('link') and not any(p['link'].rstrip('/') == old['link'].rstrip('/') for p in posts):
        raise ValueError('Feed does not yet include the supplied article; preserving it.')
    for p in posts:
        if p['link'] == old.get('link') and not p.get('image'):
            p['image'] = old.get('image', '')
    return {'posts': posts}


def read_url(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'EricJsHearth-BlogPreview/1.0'})
    with urllib.request.urlopen(request, timeout=30) as response:
        data = response.read(4 * 1024 * 1024 + 1)
        if len(data) > 4 * 1024 * 1024:
            raise ValueError('Response exceeds limit.')
        return data.decode('utf-8')


def main():
    previous = json.loads(SNAPSHOT.read_text())
    posts = parse_feed(read_url(BLOG + 'feed'))
    snapshot = select_snapshot(posts, previous)
    # Prefer the actual cover and short social description over the first body illustration.
    try:
        _, page = clean(read_url(posts[0]['link']))
        cover = safe_url(page.meta.get('og:image'))
        description, _ = clean(page.meta.get('og:description') or page.meta.get('description'))
        if cover:
            posts[0]['image'] = cover
        if description:
            posts[0]['excerpt'] = description[:220]
    except Exception as exc:
        print('Article metadata unavailable; keeping RSS metadata:', type(exc).__name__)
    content = json.dumps(snapshot, ensure_ascii=False, indent=2) + '\n'
    if content != SNAPSHOT.read_text():
        temp = SNAPSHOT.with_suffix('.tmp')
        temp.write_text(content)
        temp.replace(SNAPSHOT)
    print('Blog snapshot ready:', posts[0]['title'])


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print('Blog refresh stopped; existing preview preserved:', str(exc), file=sys.stderr)
        sys.exit(1)
