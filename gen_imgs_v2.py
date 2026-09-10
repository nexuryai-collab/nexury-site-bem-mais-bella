#!/usr/bin/env python3
"""Regenera seções WebP >= 20KB para artigos do Bem Mais Bella."""
import os, sys, textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random

PALETA = {
    "roxo_profundo": (36, 0, 70),      # #240046
    "cinza_medio": (84, 89, 95),       # #54595F
    "cinza_claro": (154, 164, 175),    # #9AA4AF
    "rosa_vibrante": (247, 37, 133),   # #F72585
    "branco": (255, 255, 255),
    "rosa_claro": (255, 240, 245),
    "roxo_claro": (245, 240, 255),
    "verde_claro": (240, 255, 240),
    "amarelo_claro": (255, 255, 240),
    "azul_claro": (240, 245, 255),
}

def font(size, bold=False):
    for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
        try: return ImageFont.truetype(p, size)
        except: pass
    return ImageFont.load_default()

def make_hero(slug, title, subtitle):
    W, H = 1920, 1080
    img = Image.new('RGB', (W, H), PALETA["roxo_profundo"])
    draw = ImageDraw.Draw(img)

    # Gradiente diagonal com múltiplas camadas
    for i in range(H):
        t = i / H
        r = int(PALETA["roxo_profundo"][0] * (1 - t) + PALETA["rosa_claro"][0] * t)
        g = int(PALETA["roxo_profundo"][1] * (1 - t) + PALETA["rosa_claro"][1] * t)
        b = int(PALETA["roxo_profundo"][2] * (1 - t) + PALETA["rosa_claro"][2] * t)
        draw.line([(0, i), (W, i)], fill=(r, g, b))

    draw.rectangle([0, 0, W, 16], fill=PALETA["rosa_vibrante"])
    for x in range(0, W, 30):
        draw.line([(x, 0), (x, 10)], fill=PALETA["branco"], width=1)

    f_title = font(72, bold=True)
    lines = textwrap.wrap(title, width=28)
    y = 300
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=f_title)
        tw = bbox[2] - bbox[0]
        draw.text(((W - tw) // 2, y), line, fill=PALETA["branco"], font=f_title)
        y += 95

    f_sub = font(34)
    bbox = draw.textbbox((0, 0), subtitle, font=f_sub)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, y + 40), subtitle, fill=PALETA["cinza_claro"], font=f_sub)

    draw.line([(W // 2 - 140, y + 100), (W // 2 + 140, y + 100)], fill=PALETA["rosa_vibrante"], width=3)

    f_foot = font(30)
    draw.text((80, H - 120), "Bem Mais Bella", fill=PALETA["cinza_claro"], font=f_foot)

    for cx, cy, r in [(140, 220, 70), (W - 180, 190, 50), (W - 140, H - 240, 60)]:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=PALETA["rosa_vibrante"], width=3)

    img = img.filter(ImageFilter.SMOOTH)
    out = f"public/artigos/{slug}"
    os.makedirs(out, exist_ok=True)
    path = os.path.join(out, 'hero.webp')
    img.save(path, 'WEBP', quality=95, optimize=True)
    size = os.path.getsize(path)
    print(f"  hero.webp: {size/1024:.1f} KB")

def make_section(slug, idx, title, bg_color):
    W, H = 1920, 1080
    img = Image.new('RGB', (W, H), bg_color)
    draw = ImageDraw.Draw(img)

    # Padrão de pontos para adicionar textura
    dot_step = 35
    dot_colors = [
        (bg_color[0] + 20, bg_color[1] + 10, bg_color[2] + 30),
        (bg_color[0] + 15, bg_color[1] + 25, bg_color[2] + 10),
        (bg_color[0] + 30, bg_color[1] + 5, bg_color[2] + 20),
    ]
    for y in range(0, H, dot_step):
        for x in range(0, W, dot_step):
            d = random.randint(8, 18)
            c = random.choice(dot_colors)
            draw.ellipse([x, y, x + d, y + d], fill=c)

    # Faixa colorida
    draw.rectangle([0, 0, W, 14], fill=PALETA["rosa_vibrante"])

    # Título
    f_title = font(64, bold=True)
    lines = textwrap.wrap(title, width=30)
    text_color = PALETA["roxo_profundo"] if bg_color != PALETA["roxo_profundo"] else PALETA["branco"]
    y = 260
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=f_title)
        tw = bbox[2] - bbox[0]
        draw.text(((W - tw) // 2, y), line, fill=text_color, font=f_title)
        y += 80

    # Subtítulo secundário
    f_sub = font(30)
    sub = f"Seção {idx} • Bem Mais Bella"
    bbox = draw.textbbox((0, 0), sub, font=f_sub)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, y + 20), sub, fill=PALETA["cinza_medio"], font=f_sub)

    # Elementos decorativos
    for cx, cy, r in [(200, 180, 40), (W - 220, 160, 35), (W - 160, H - 200, 45), (120, H - 240, 30)]:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=PALETA["rosa_vibrante"], width=2)

    # Rodapé
    f_foot = font(28)
    draw.text((80, H - 100), "Bem Mais Bella", fill=PALETA["cinza_medio"], font=f_foot)
    draw.text((W - 360, H - 100), "2026 • Maternidade Consciente", fill=PALETA["cinza_medio"], font=f_foot)

    img = img.filter(ImageFilter.SMOOTH)
    out = f"public/artigos/{slug}"
    os.makedirs(out, exist_ok=True)
    path = os.path.join(out, f'sec{idx}.webp')
    img.save(path, 'WEBP', quality=95, optimize=True)
    size = os.path.getsize(path)
    print(f"  sec{idx}.webp: {size/1024:.1f} KB")

def generate(slug, hero_title, hero_sub, sections):
    make_hero(slug, hero_title, hero_sub)
    bg_colors = [
        PALETA["rosa_claro"], PALETA["roxo_claro"],
        PALETA["verde_claro"], PALETA["amarelo_claro"], PALETA["azul_claro"],
    ]
    for i, (title,) in enumerate(sections):
        make_section(slug, i + 1, title[0], bg_colors[i % len(bg_colors)])

if __name__ == '__main__':
    slug = sys.argv[1]
    hero_t = sys.argv[2] if len(sys.argv) > 2 else "Artigo Hype 2026"
    hero_s = sys.argv[3] if len(sys.argv) > 3 else "Bem Mais Bella"
    secs = sys.argv[4:9]
    if not secs:
        secs = ["Entendendo o Contexto", "Sinais e Sintomas", "Como se Cuidar", "Rede de Apoio", "Quando Buscar Ajuda"]
    generate(slug, hero_t, hero_s, [(s,) for s in secs])