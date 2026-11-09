#!/usr/bin/env python3
"""Offline structural checks for the academic homepage; requires Python 3.8+."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import re
import json
import sys

ROOT = Path(__file__).resolve().parents[1]

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.anchors = []
        self.assets = []
        self.has_title = False
        self.json_ld = []
        self.script_content = []
        self._json_script = False
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f"Duplicate HTML ID: {a['id']}"
            self.ids.add(a['id'])
        if tag == 'a' and a.get('href'):
            self.anchors.append(a['href'])
        if tag in {'link', 'script'}:
            key = 'href' if tag == 'link' else 'src'
            if a.get(key):
                self.assets.append(a[key])
        if tag == 'title':
            self._in_title = True
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self._json_script = True

    def handle_endtag(self, tag):
        if tag == 'title': self._in_title = False
        if tag == 'script' and self._json_script:
            self._json_script = False
            self.json_ld.append(''.join(self.script_content))
            self.script_content = []

    def handle_data(self, data):
        if self._in_title and data.strip(): self.has_title = True
        if self._json_script: self.script_content.append(data)


def main():
    markup = (ROOT / 'index.html').read_text(encoding='utf-8')
    parser = PageParser()
    parser.feed(markup)
    assert parser.has_title, 'Document title missing'
    assert parser.json_ld, 'Schema.org Person metadata missing'
    profile = json.loads(parser.json_ld[0])
    assert profile['name'] == 'Weihan Yuan'
    for link in parser.anchors + parser.assets:
        if link.startswith(('#', 'mailto:')):
            if link.startswith('#'):
                assert link[1:] in parser.ids, f'Broken anchor: {link}'
            continue
        pieces = urlsplit(link)
        if pieces.scheme in ('https', 'http'):
            assert pieces.scheme == 'https', f'Non-HTTPS link: {link}'
            continue
        assert not pieces.scheme and not pieces.netloc, f'Unexpected URI: {link}'
        assert (ROOT / pieces.path).is_file(), f'Missing local asset: {link}'
    # Never publish placeholders or claim a new paper has been accepted.
    for forbidden in ('0000-0000-0000-0000', 'YOUR-EMAIL', 'YOUR-GITHUB', 'accepted at CVPR', 'CVPR 2027 paper accepted'):
        assert forbidden.lower() not in markup.lower(), f'Forbidden placeholder or claim: {forbidden}'
    assert markup.count('class="publication"') == 2, 'Expected two verified publications'
    assert (ROOT / '.nojekyll').is_file(), 'Missing .nojekyll for GitHub Pages'
    print(f"PASS: {len(parser.ids)} unique IDs, {len(parser.anchors)} links, {len(parser.assets)} assets, 2 verified papers, valid JSON-LD")
    return 0

if __name__ == '__main__':
    try: sys.exit(main())
    except (AssertionError, ValueError, OSError) as exc:
        print(f'FAIL: {exc}', file=sys.stderr)
        sys.exit(1)
