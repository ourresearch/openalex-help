#!/usr/bin/env python3
"""Full-rule sweep of a CF Pages branch deploy against its _redirects file.

Usage: sweep.py <redirects_file> <base_url> <out_tsv>

For every rule (in file order) we build a probe path (splats get a synthetic
suffix), compute the EXPECTED first-matching rule in file order, then issue a
no-follow request and classify:
  FIRE-OK     status is 3xx and Location matches expected target
  FIRE-WRONG  3xx but Location differs from expected
  DEAD        non-3xx (SPA 200 fallthrough)
"""
import sys, re, concurrent.futures, urllib.request, urllib.error

redirects_file, base_url, out_tsv = sys.argv[1], sys.argv[2], sys.argv[3]

rules = []  # (lineno, source, target, status)
for lineno, line in enumerate(open(redirects_file), 1):
    s = line.strip()
    if not s or s.startswith('#'):
        continue
    parts = s.split()
    if len(parts) < 2:
        continue
    src, tgt = parts[0], parts[1]
    st = parts[2] if len(parts) > 2 else '301'
    rules.append((lineno, src, tgt, st))

print(f"{len(rules)} rules parsed from {redirects_file}", file=sys.stderr)

def probe_path(src, idx):
    if src.endswith('/*'):
        return src[:-1] + f"__probe{idx}__"
    return src

def match(rule_src, path):
    if rule_src.endswith('/*'):
        return path.startswith(rule_src[:-1]) or path == rule_src[:-2]
    return path == rule_src

def expected_rule(path):
    for r in rules:
        if match(r[1], path):
            return r
    return None

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None

opener = urllib.request.build_opener(NoRedirect)

def fetch(path):
    req = urllib.request.Request(base_url + path, method='HEAD',
                                 headers={'User-Agent': 'oxjob354-sweep'})
    try:
        resp = opener.open(req, timeout=20)
        return resp.status, resp.headers.get('Location', '')
    except urllib.error.HTTPError as e:
        return e.code, e.headers.get('Location', '')
    except Exception as e:
        return -1, str(e)[:80]

def check(item):
    i, (lineno, src, tgt, st) = item
    path = probe_path(src, i)
    exp = expected_rule(path)
    status, loc = fetch(path)
    exp_tgt = exp[2] if exp else '?'
    if exp and exp[1].endswith('/*') and ':splat' in exp_tgt:
        exp_tgt = exp_tgt.replace(':splat', path[len(exp[1])-1:])
    if 300 <= status < 400:
        # compare path component of Location
        locpath = re.sub(r'^https?://[^/]+', '', loc)
        verdict = 'FIRE-OK' if locpath == exp_tgt else 'FIRE-WRONG'
    elif status == -1:
        verdict = 'ERROR'
    else:
        verdict = 'DEAD'
    shadowed = '' if (exp and exp[0] == lineno) else f"shadowed-by-line-{exp[0] if exp else '?'}"
    return (lineno, src, exp_tgt, status, loc, verdict, shadowed)

with concurrent.futures.ThreadPoolExecutor(max_workers=24) as ex:
    results = list(ex.map(check, enumerate(rules)))

with open(out_tsv, 'w') as f:
    f.write("line\tsource\texpected_target\tstatus\tlocation\tverdict\tnote\n")
    for r in results:
        f.write('\t'.join(str(x) for x in r) + '\n')

from collections import Counter
c = Counter(r[5] for r in results)
print(f"RESULT {base_url}: {dict(c)}", file=sys.stderr)
dead = [r for r in results if r[5] in ('DEAD', 'ERROR', 'FIRE-WRONG')]
for r in dead[:30]:
    print(f"  line {r[0]} {r[1]} -> {r[3]} {r[4]} [{r[5]}] {r[6]}", file=sys.stderr)
if len(dead) > 30:
    print(f"  ... {len(dead)-30} more", file=sys.stderr)
