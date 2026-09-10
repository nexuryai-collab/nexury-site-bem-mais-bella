#!/usr/bin/env python3
"""Gera capa WebP >= 20KB para artigos do Bem Mais Bella."""
import os, sys, textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter

PALETA = {
    "roxo": (36, 0, 70), "rosa": (247, 37, 133),
    "branco": (255, 255, 255), "cinza": (154, 164, 175),
}

def font(size, bold=False):
    paths = [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
    ]
    for p in paths:
        try: return ImageFont.truetype(p, size)
        except: pass
    return ImageFont.load_default()

def make_hero(slug, title, subtitle, out_dir):
    W, H = 1920, 1080
    img = Image.new('RGB', (W, H), PALETA["roxo"])
    draw = ImageDraw.Draw(img)

    # Gradiente diagonal
    for i in range(H):
        t = i / H
        r = int(PALETA["roxo"][0] * (1 - t) + PALETA["rosa"][0] * t)
        g = int(PALETA["roxo"][1] * (1 - t) + PALETA["rosa"][1] * t)
        b = int(PALETA["roxo"][2] * (1 - t) + PALETA["rosa"][2] * t)
        draw.line([(0, i), (W, i)], fill=(r, g, b))

    # Faixa superior
    draw.rectangle([0, 0, W, 12], fill=PALETA["rosa"])

    # Linhas decorativas
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, 8)], fill=PALETA["branco"], width=1)

    # Título principal
    f_title = font(72, bold=True)
    lines = textwrap.wrap(title, width=26)
    y = 280
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=f_title)
        tw = bbox[2] - bbox[0]
        draw.text(((W - tw) // 2, y), line, fill=PALETA["branco"], font=f_title)
        y += 90

    # Subtítulo
    f_sub = font(32)
    bbox = draw.textbbox((0, 0), subtitle, font=f_sub)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, y + 30), subtitle, fill=PALETA["cinza"], font=f_sub)

    # Linha separadora
    draw.line([(W // 2 - 120, y + 90), (W // 2 + 120, y + 90)], fill=PALETA["rosa"], width=3)

    # Rodapé
    f_foot = font(28)
    draw.text((60, H - 100), "Bem Mais Bella", fill=PALETA["cinza"], font=f_foot)
    draw.text((W - 320, H - 100), "2026 • Moda Consciente", fill=PALETA["cinza"], font=f_foot)

    # Círculos decorativos
    for cx, cy, r in [(120, 200, 60), (W - 150, 180, 40), (W - 120, H - 200, 50)]:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=PALETA["rosa"], width=2)

    # Aplicar leve desfoque para suavizar
    img = img.filter(ImageFilter.SMOOTH)

    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, 'hero.webp')
    img.save(path, 'WEBP', quality=92, optimize=True)
    size = os.path.getsize(path)
    print(f"hero.webp: {size} bytes ({size/1024:.1f} KB)")
    return size

if __name__ == '__main__':
    slug = sys.argv[1]
    title = sys.argv[2] if len(sys.argv) > 2 else "Artigo Hype 2026"
    subtitle = sys.argv[3] if len(sys.argv) > 3 else "Bem Mais Bella"
    out = f"public/artigos/{slug}"
    size = make_hero(slug, title, subtitle, out)
    if size < 20000:
        print(f"AVISO: capa abaixo de 20KB ({size} bytes) — tentando reforçar...")
        # Refazer com mais complexidade
        img = Image.new('RGB', (1920, 1080), (36, 0, 70))
        draw = ImageDraw.Draw(img)
        # Preencher com padrão de pontos
        for y in range(0, 1080, 20):
            for x in range(0, 1920, 20):
                draw.point((x, y), fill=(60, 10, 100))
        f = font(64, bold=True)
        draw.text((100, 400), title, fill=(255, 255, 255), font=f)
        img.save(os.path.join(out, 'hero.webp'), 'WEBP', quality=95)
        print(f"Refeito: {os.path.getsize(os.path.join(out, 'hero.webp'))} bytes")