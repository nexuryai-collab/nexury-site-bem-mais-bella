from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, random

slug = 'brazilcore-hype-2026-tendencias'
out_dir = f'public/artigos/{slug}'
os.makedirs(out_dir, exist_ok=True)

def font(size, bold=True):
    paths = [
        ('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'),
        ('/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf', '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'),
    ]
    for bp, rp in paths:
        try:
            return ImageFont.truetype(bp if bold else rp, size)
        except:
            pass
    return ImageFont.load_default()

W, H = 1920, 1080

def make_section(idx, title, bullets, bg_color, text_color, accent_color):
    img = Image.new('RGB', (W, H), bg_color)
    d = ImageDraw.Draw(img)

    # Subtle gradient overlay
    for y in range(H):
        t = (y / H) * 0.2
        r = int(bg_color[0] * (1 - t) + accent_color[0] * t)
        g = int(bg_color[1] * (1 - t) + accent_color[1] * t)
        b = int(bg_color[2] * (1 - t) + accent_color[2] * t)
        d.line([(0, y), (W, y)], fill=(r, g, b))

    # Noise overlay
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for _ in range(2500):
        x = random.randint(0, W)
        y_pos = random.randint(0, H)
        s = random.randint(1, 3)
        od.ellipse([x, y_pos, x+s, y_pos+s], fill=(255, 255, 255, random.randint(3, 12)))
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
    d = ImageDraw.Draw(img)

    # Accent stripe at top
    d.rectangle([0, 0, W, 20], fill=accent_color)

    # Title
    f_t = font(72, bold=True)
    bbox = d.textbbox((0, 0), title, font=f_t)
    tw = bbox[2] - bbox[0]
    d.text(((W - tw) // 2, 180), title, fill=text_color, font=f_t)

    # Bullets with accent dots
    f_b = font(34, bold=True)
    y = 320
    for bullet in bullets:
        d.ellipse([W//2 - 360, y-10, W//2 - 330, y+15], fill=accent_color)
        d.text((W//2 - 310, y), bullet, fill=text_color, font=f_b)
        y += 70

    # Section label
    f_s = font(28)
    label = f"Seção {idx} • Bem Mais Bella 2026"
    bbox = d.textbbox((0, 0), label, font=f_s)
    tw = bbox[2] - bbox[0]
    d.text(((W - tw) // 2, y + 30), label, fill=(120, 120, 120), font=f_s)

    # Decorative circles
    for cx, cy, r in [(200, 250, 40), (W-240, 220, 35), (W-180, H-280, 45), (140, H-260, 30), (W-150, 400, 25)]:
        d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=accent_color, width=3)

    img = img.filter(ImageFilter.SMOOTH_MORE)
    path = os.path.join(out_dir, f'sec{idx}.webp')
    img.save(path, 'WEBP', quality=95, method=6)
    size = os.path.getsize(path)
    print(f"sec{idx}.webp: {size/1024:.1f} KB")

# ---- HERO ----
print("Generating hero.webp...")
# Yellow-green-blue gradient
img = Image.new('RGB', (W, H), (255, 240, 200))
d = ImageDraw.Draw(img)
for y in range(H):
    t = y / H
    if t < 0.4:
        r = int(255 * (1 - t/0.4) + 50 * (t/0.4))
        g = int(230 * (1 - t/0.4) + 140 * (t/0.4))
        b = int(40 * (1 - t/0.4) + 60 * (t/0.4))
    elif t < 0.7:
        t2 = (t - 0.4) / 0.3
        r = int(50 * (1 - t2) + 0 * t2)
        g = int(140 * (1 - t2) + 100 * t2)
        b = int(60 * (1 - t2) + 120 * t2)
    else:
        t2 = (t - 0.7) / 0.3
        r = int(0 * (1 - t2) + 30 * t2)
        g = int(100 * (1 - t2) + 60 * t2)
        b = int(120 * (1 - t2) + 140 * t2)
    d.line([(0, y), (W, y)], fill=(r, g, b))

# Noise
overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for _ in range(3000):
    x = random.randint(0, W)
    y = random.randint(0, H)
    s = random.randint(1, 3)
    od.ellipse([x, y, x+s, y+s], fill=(255, 255, 255, random.randint(5, 15)))
img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
d = ImageDraw.Draw(img)

# Title
f_title = font(96, bold=True)
title = "BRAZILCORE 2026"
bbox = d.textbbox((0, 0), title, font=f_title)
tw = bbox[2] - bbox[0]
d.text(((W - tw) // 2, 180), title, fill=(0, 50, 0), font=f_title)

f_sub = font(44)
sub = "HYPE - Verde, Amarelo e Identidade"
bbox = d.textbbox((0, 0), sub, font=f_sub)
tw = bbox[2] - bbox[0]
d.text(((W - tw) // 2, 310), sub, fill=(30, 30, 30), font=f_sub)

# Decorative elements
for cx in range(150, W, 300):
    d.ellipse([cx-10, 120-10, cx+10, 120+10], fill=(255, 255, 255, 200))

f_foot = font(36)
d.text((80, H - 100), "Bem Mais Bella", fill=(80, 80, 80), font=f_foot)

img = img.filter(ImageFilter.SMOOTH)
path = os.path.join(out_dir, 'hero.webp')
img.save(path, 'WEBP', quality=95, method=6)
print(f"hero.webp: {os.path.getsize(path)/1024:.1f} KB")

# ---- 5 SECTIONS ----
# (bg RGB, text RGB, accent RGB)
sections = [
    (1, "SOMOS DAQUI",
     ["O Brasil como referencia global", "Cores da bandeira em alta", "Streetwear tropical"],
     (240, 255, 240), (30, 80, 50), (80, 200, 100)),
    (2, "CULTURA POP",
     ["Funk, sertanejo e moda", "Copa do Mundo 2026", "Influencia do cinema"],
     (255, 248, 240), (80, 50, 15), (240, 160, 60)),
    (3, "TENDENCIAS",
     ["Passarelas brasileiras", "Brazilcore global", "Streetwear de luxo"],
     (240, 248, 255), (30, 50, 110), (80, 150, 240)),
    (4, "BELEZA INCLUSIVA",
     ["Todos os tons de pele", "Cabelos naturais", "Maquiagem sem regras"],
     (255, 240, 248), (130, 30, 65), (240, 80, 140)),
    (5, "ESTILO HYPE",
     ["Looks do dia a dia", "Acessorios brasileiros", "Como adaptar a tendencia"],
     (255, 253, 245), (95, 50, 15), (220, 170, 60)),
]

for idx, title, bullets, bg, text_c, accent in sections:
    make_section(idx, title, bullets, bg, text_c, accent)

print("All images generated successfully!")
