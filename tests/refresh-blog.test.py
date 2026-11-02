import runpy
import unittest
import json
import tempfile
from urllib.error import HTTPError
from pathlib import Path

m = runpy.run_path(str(Path(__file__).resolve().parents[1] / 'scripts/refresh-blog.py'))
LINK = 'https://ericjm.substack.com/p/the-player-has-to-change'

def feed(link=LINK, title='The Player Has to Change', date='Fri, 30 Oct 2026 10:00:00 +0000', image=True):
    return f'''<rss><channel><item><title>{title}</title><link>{link}</link><pubDate>{date}</pubDate><description><![CDATA[<p>A <b>short</b> description.</p><script>evil()</script><img src="https://substackcdn.com/cover.jpg">]]></description>{'<enclosure type="image/jpeg" url="https://substackcdn.com/og.jpg"/>' if image else ''}</item></channel></rss>'''

class RefreshTests(unittest.TestCase):
    def test_real_metadata(self):
        p = m['parse_feed'](feed())[0]
        self.assertEqual(p['image'], 'https://substackcdn.com/og.jpg')
        self.assertEqual(p['excerpt'], 'A short description.')
        self.assertEqual(p['date'], '2026-10-30T10:00:00+00:00')
    def test_body_image(self):
        self.assertEqual(m['parse_feed'](feed(image=False))[0]['image'], 'https://substackcdn.com/cover.jpg')
    def test_untrusted_and_invalid_feed(self):
        for link in ['https://evil.com/x', 'javascript:evil', 'https://ericjm.substack.com.evil.com/p/x']:
            self.assertEqual(m['parse_feed'](feed(link=link)), [])
        self.assertEqual(m['parse_feed'](feed(date='bad')), [])
        with self.assertRaises(Exception):
            m['parse_feed']('<html>unavailable')
    def test_stale_feed_preserves_supplied_article(self):
        previous = {'posts': [{'link': LINK, 'date': '', 'image': 'assets/blog/the-player-has-to-change.webp'}]}
        with self.assertRaises(ValueError):
            m['select_snapshot'](m['parse_feed'](feed(link='https://ericjm.substack.com/p/old')), previous)
        p = m['parse_feed'](feed())
        self.assertEqual(m['select_snapshot'](p, previous)['posts'][0]['link'], LINK)
        previous['posts'][0]['date'] = '2026-11-01T00:00:00+00:00'
        with self.assertRaises(ValueError):
            m['select_snapshot'](p, previous)
    def test_metadata(self):
        _, parser = m['clean']('<meta property="og:image" content="https://substackcdn.com/actual.jpg"><meta property="og:description" content="Brief &amp; useful">')
        self.assertEqual(parser.meta['og:description'], 'Brief & useful')

class RecoveryTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.path = Path(self.directory.name) / 'blog-posts.json'
        self.previous = {'posts': [{'link': LINK, 'title': 'Original', 'excerpt': 'Original text', 'image': 'assets/blog/the-player-has-to-change.webp', 'date': ''}]}
        self.path.write_text(json.dumps(self.previous))
        self.original = self.path.read_bytes()

    def test_actual_403_regression(self):
        def blocked(url):
            raise HTTPError(url, 403, 'Forbidden', {}, None)
        result = m['refresh'](self.path, read=blocked)
        self.assertEqual(result['outcome'], 'unavailable')
        self.assertFalse(result['changed'])
        self.assertIn('HTTP 403', result['message'])
        self.assertIn('NOT updated', result['message'])
        self.assertEqual(self.path.read_bytes(), self.original)

    def test_invalid_feed_keeps_original(self):
        result = m['refresh'](self.path, read=lambda url: '<html>Site unavailable</html>')
        self.assertEqual(result['outcome'], 'unavailable')
        self.assertEqual(self.path.read_bytes(), self.original)

    def test_manual_update_does_not_fetch_substack(self):
        def forbidden_fetch(url):
            self.fail('Manual updates must not need a network request')
        values = {'url': 'https://ericjm.substack.com/p/new-post', 'title': 'New post',
                  'description': 'A brief new description.', 'image': 'https://substackcdn.com/new.jpg',
                  'date': '2026-11-02T12:00:00Z'}
        result = m['refresh'](self.path, read=forbidden_fetch, manual=values)
        self.assertEqual(result['outcome'], 'updated')
        data = json.loads(self.path.read_text())
        self.assertEqual(data['posts'][0]['link'], values['url'])
        self.assertEqual(data['posts'][0]['date'], '2026-11-02T12:00:00+00:00')
        self.assertEqual(data['posts'][1]['link'], LINK)
        result = m['refresh'](self.path, read=forbidden_fetch, manual=values)
        self.assertEqual(result['outcome'], 'unchanged')

    def test_manual_validation_never_overwrites(self):
        for values in [dict(url=LINK), dict(url='https://evil.test/p/x', title='X', description='X', image='https://x.test/i.jpg'),
                       dict(url=LINK, title='X', description='X', image='javascript:evil'),
                       dict(url=LINK, title='X', description='X', image='https://x.test/i.jpg', date='yesterday')]:
            with self.assertRaises(ValueError):
                m['refresh'](self.path, manual=values)
            self.assertEqual(self.path.read_bytes(), self.original)

    def test_automatic_refresh_still_updates_when_feed_works(self):
        def available(url):
            if url.endswith('/feed'):
                return feed()
            raise HTTPError(url, 403, 'Forbidden', {}, None)
        result = m['refresh'](self.path, read=available)
        self.assertEqual(result['outcome'], 'updated')
        self.assertEqual(json.loads(self.path.read_text())['posts'][0]['title'], 'The Player Has to Change')
        self.assertEqual(m['refresh'](self.path, read=available)['outcome'], 'unchanged')

    def test_programming_errors_remain_failures(self):
        def broken(url):
            raise RuntimeError('Unexpected bug')
        with self.assertRaises(RuntimeError):
            m['refresh'](self.path, read=broken)
        self.assertEqual(self.path.read_bytes(), self.original)

    def test_invalid_local_snapshot_remains_failure(self):
        self.path.write_text('{bad')
        with self.assertRaises(ValueError):
            m['refresh'](self.path, read=lambda url: feed())
        self.assertEqual(self.path.read_text(), '{bad')


unittest.main()

