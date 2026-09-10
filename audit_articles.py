import os, glob

base = '/opt/data/nexury-site-bem-mais-bella/src/app/artigos'
pub = '/opt/data/nexury-site-bem-mais-bella/public/artigos'

articles = []
for d in glob.glob(os.path.join(base, '*', 'artigo.md')):
    slug = os.path.basename(os.path.dirname(d))
    with open(d, encoding='utf-8') as f:
        text = f.read()
    words = len(text.split())
    img_dir = os.path.join(pub, slug)
    imgs = []
    if os.path.isdir(img_dir):
        for f in sorted(os.listdir(img_dir)):
            fp = os.path.join(img_dir, f)
            try:
                sz = os.path.getsize(fp)
            except OSError:
                sz = 0
            imgs.append((f, sz))
    articles.append((slug, words, imgs))

articles.sort(key=lambda x: -x[1])
print(f"Total artigo.md files: {len(articles)}")
print()
for slug, words, imgs in articles[:15]:
    img_count = len([i for i in imgs if i[1] >= 20000])
    print(f"{slug}: {words} words, {img_count}/6 imgs >=20KB ({len(imgs)} total)")
print()
print("--- Last 10 by words ---")
for slug, words, imgs in articles[-10:]:
    img_count = len([i for i in imgs if i[1] >= 20000])
    print(f"{slug}: {words} words, {img_count}/6 imgs >=20KB ({len(imgs)} total)")
