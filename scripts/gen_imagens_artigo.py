#!/usr/bin/env python3
"""
Gera 6 imagens WebP placeholder (hero + sec1..sec5) para um artigo do Bem Mais Bella.
Padrão visual: paleta unica do site (#240046, #54595F, #9AA4AF, #F72585).
Nenhum texto dentro da imagem (regra de AGENTS.md). Fotografia documental simulada
via formas geometricas suaves — apenas placeholder visual até o orchestrator
regenerar com o Higgsfield.
"""
from PIL import Image, ImageDraw, ImageFilter
import os

BASE = "/opt/data/nexury-site-bem-mais-bella"
PUB = os.path.join(BASE, "public", "artigos")
PALETTE = ['#240046', '#54595F', '#9AA4AF']
ACCENT = '#F72585'

def hex_to_rgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        return tuple(int(h[i]*2, 16) for i in (0, 1, 2))
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def make(path, palette, accent):
    prgb = [hex_to_rgb(c) for c in palette]
    argb = hex_to_rgb(accent)
    w, h = 1600, 900
    img = Image.new('RGB', (w, h), prgb[0])
    px = img.load()
    for y in range(h):
        t = y / h
        for x in range(w):
            sx = x / w
            r = int(prgb[1][0] * (1 - t) + prgb[2][0] * t + argb[0] * sx * (1 - sx) * 18)
            g = int(prgb[1][1] * (1 - t) + prgb[2][1] * t + argb[1] * sx * (1 - sx) * 18)
            b = int(prgb[1][2] * (1 - t) + prgb[2][2] * t + argb[2] * sx * (1 - sx) * 18)
            px[x, y] = (max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b)))
    draw = ImageDraw.Draw(img)
    for i in range(5):
        x = 100 + i * 290
        y = 120 + (i % 2) * 110
        draw.ellipse((x, y, x + 330, y + 230), fill=accent, outline=palette[2], width=8)
    draw.rectangle((520, 600, 1180, 760), fill=accent, outline=palette[1], width=8)
    img = img.filter(ImageFilter.GaussianBlur(0.3))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, 'WEBP', quality=90, method=6)
    sz = os.path.getsize(path)
    print(f"  {os.path.basename(path)}: {sz/1024:.1f} KB")

def gerar(slug, hero_palette=None):
    d = os.path.join(PUB, slug)
    os.makedirs(d, exist_ok=True)
    hero_pal = hero_palette or PALETTE
    make(os.path.join(d, 'hero.webp'), hero_pal, ACCENT)
    for i in range(1, 6):
        palette = [('#240046', '#54595F', '#9AA4AF'),
                   ('#54595F', '#240046', '#F72585'),
                   ('#9AA4AF', '#54595F', '#240046'),
                   ('#F72585', '#240046', '#54595F'),
                   ('#54595F', '#F72585', '#9AA4AF')][i - 1]
        accent_hex = '#F72585' if i % 2 else '#240046'
        make(os.path.join(d, f'sec{i}.webp'), palette, accent_hex)

if __name__ == '__main__':
    import sys
    slug = sys.argv[1] if len(sys.argv) > 1 else None
    if slug:
        gerar(slug)
    else:
        gerar('sinergia-sensorial-beleza-2026')
        gerar('microalegrias-bem-estar-2026')
