"""Generate 6 WebP images (hero + sec1..5) for a given slug using the brand palette."""
import sys, os
from PIL import Image, ImageDraw, ImageFilter

BRAND = {
    'dark': (36, 0, 70),
    'gray': (84, 89, 95),
    'light': (154, 164, 175),
    'pink': (247, 37, 133),
}

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
    for i in range(5):
        x = 100 + i * 290
        y = 120 + (i % 2) * 110
        draw.ellipse((x, y, x + 330, y + 230), fill=accent, outline=palette[2], width=8)
    draw.rectangle((520, 600, 1180, 760), fill=accent, outline=palette[1], width=8)
    img = img.filter(ImageFilter.GaussianBlur(0.3))
    img.save(path, 'WEBP', quality=88, method=6)

if __name__ == '__main__':
    slug = sys.argv[1]
    d = f'/opt/data/nexury-site-bem-mais-bella/public/artigos/{slug}'
    os.makedirs(d, exist_ok=True)
    make(f'{d}/hero.webp', 'hero', [BRAND['dark'], BRAND['gray'], BRAND['light']], BRAND['pink'])
    for i in range(1, 6):
        palettes = [
            (BRAND['gray'], BRAND['dark'], BRAND['pink']),
            (BRAND['pink'], BRAND['dark'], BRAND['gray']),
            (BRAND['light'], BRAND['gray'], BRAND['dark']),
            (BRAND['dark'], BRAND['pink'], BRAND['light']),
            (BRAND['gray'], BRAND['light'], BRAND['pink']),
        ][i - 1]
        accent = BRAND['pink'] if i % 2 else BRAND['dark']
        make(f'{d}/sec{i}.webp', f'sec{i}', palettes, accent)
    print(f'OK: {slug} — 6 images generated')