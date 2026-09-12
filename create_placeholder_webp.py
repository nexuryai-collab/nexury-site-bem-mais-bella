from PIL import Image, ImageDraw, ImageFilter

def make(path, name, palette, accent):
    w, h = 1600, 900
    img = Image.new('RGB', (w, h), palette[0])
    px = img.load()
    for y in range(h):
        t = y / h
        for x in range(w):
            sx = x / w
            r = int(palette[1][0] * (1 - t) + palette[2][0] * t + accent[0] * sx * (1 - sx) * 18)
            g = int(palette[1][1] * (1 - t) + palette[2][1] * t + accent[1] * sx * (1 - sx) * 18)
            b = int(palette[1][2] * (1 - t) + palette[2][2] * t + accent[2] * sx * (1 - sx) * 18)
            px[x, y] = (r, g, b)
    draw = ImageDraw.Draw(img)
    # soft translucent shapes, no text, no logos
    for i in range(5):
        x = 100 + i * 290
        y = 120 + (i % 2) * 110
        draw.ellipse((x, y, x + 330, y + 230), fill=accent, outline=palette[2], width=8, alpha=90)
    draw.rectangle((520, 600, 1180, 760), fill=accent, outline=palette[1], width=8, alpha=100)
    img = img.filter(ImageFilter.GaussianBlur(0.3))
    img.save(path, 'WEBP', quality=88, method=6)

make('/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-moda-consciente-2026/hero.webp', 'hero', ['#240046', '#54595F', '#9AA4AF'], '#F72585')
for i in range(1, 6):
    palette = [('#240046', '#54595F', '#9AA4AF'), ('#54595F', '#240046', '#F72585'), ('#9AA4AF', '#54595F', '#240046'), ('#F72585', '#240046', '#54595F'), ('#54595F', '#F72585', '#9AA4AF')][i - 1]
    accent = (247, 37, 133) if i % 2 else (24, 0, 70)
    make(f'/opt/data/nexury-site-bem-mais-bella/public/artigos/hype-moda-consciente-2026/sec{i}.webp', f'sec{i}', palette, accent)
