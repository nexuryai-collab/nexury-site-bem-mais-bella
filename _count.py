import os, re, glob, subprocess
ROOT = '/opt/data/nexury-site-bem-mais-bella'
files = glob.glob(f'{ROOT}/src/app/**/artigo.md', recursive=True)
# unique slug by dir basename
seen = {}
for f in files:
    d = os.path.basename(os.path.dirname(f))
    seen.setdefault(d, []).append(f)
data = []
for slug, paths in seen.items():
    best = max(paths, key=lambda p: os.path.getsize(p))
    with open(best, encoding='utf-8') as fh:
        c = fh.read()
    m = re.search(r'^---\r?\n([\s\S]*?)\r?\n---', c)
    body = c[m.end():] if m else c
    words = len(body.split())
    data.append((words, slug))
data.sort()
total = len(data)
ge2500 = [d for d in data if d[0] >= 2500]
print(f"total unique slug folders: {total}")
print(f">=2500 palavras: {len(ge2500)}")
print(f"<2500 (stubs): {total - len(ge2500)}")
# list existing moda/beleza slugs to avoid duplicates
print("\nExistentes moda/beleza/consciente/sustentavel:")
for w, slug in data:
    if any(k in slug for k in ['moda','beleza','conscien','sustent','upcycl','circular']):
        print(f"  {w:5d} {slug}")
