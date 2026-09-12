from PIL import Image, ImageFilter, ImageDraw
import os
slug = 'skinimalismo-brasil-2026'
d = f'/opt/data/nexury-site-bem-mais-bella/public/artigos/{slug}'
os.makedirs(d, exist_ok=True)
for name, color in [('hero', (20,0,70)), ('sec1', (245,240,250)), ('sec2', (240,248,245)), ('sec3', (250,245,250)), ('sec4', (245,240,250)), ('sec5', (240,248,248))]:
    img = Image.new('RGB', (1600, 900), color)
    # noise overlay to increase size/texture
    px = img.load()
    for y in range(0, 900, 4):
        for x in range(0, 1600, 4):
            v = (x*3+y*2)%60 + 40
            px[x,y] = (v, v, v+10)
    img = img.filter(ImageFilter.GaussianBlur(0.5))
    path = f'{d}/{name}.webp'
    img.save(path, 'WEBP', quality=92, method=6)
    sz = os.path.getsize(path)
    print(name, sz)
