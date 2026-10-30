import runpy
import unittest
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

unittest.main()
