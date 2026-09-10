#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

PALETA = {
    'roxo': (36,0,70),
    'rosa': (247,37,133),
    'rosaC': (255,240,245),
    'roxC': (245,240,255),
    'verdC': (240,255,240),
    'amC': (255,255,240),
    'azC': (240,245,255),
}

def font(size=40):
    for fp in [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
    ]:
        try:
            return ImageFont.truetype(fp, size)
        except:
            pass
    return ImageFont.load_default()

def make(path, bg, title, sub):
    w, h = 1600, 900
    im = Image.new('RGB', (w, h), bg)
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, w, 14], fill=PALETA['rosa'])
    for i in range(0, h, 60):
        r, g, b = bg
        shift = ((i // 60) % 3) * 6
        d.line([0, i, w, i], fill=(min(255, max(0, r + shift)), min(255, max(0, g + shift)), min(255, max(0, b + shift))), width=1)
    ft = font(64)
    fs = font(34)
    lines = textwrap.wrap(title, width=42)
    y = (h - len(lines) * 80) // 2
    for ln in lines:
        bb = d.textbbox((0, 0), ln, font=ft)
        tw = bb[2] - bb[0]
        d.text(((w - tw) // 2, y), ln, fill=PALETA['roxo'] if bg != PALETA['roxo'] else (255, 255, 255), font=ft)
        y += 80
    bb = d.textbbox((0, 0), sub, font=fs)
    tw = bb[2] - bb[0]
    d.text(((w - tw) // 2, y + 24), sub, fill=(84, 89, 95), font=fs)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=95, method=6)
    print(path, os.path.getsize(path))

make('public/artigos/k-beauty-2026-hype/hero.webp', PALETA['roxo'], 'K-Beauty 2026: A Revolução Coreana que Transformou a Pele Brasileira', 'Bem Mais Bella • Estilo e Beleza')
secs = [
    ('O Que é K-Beauty e Por Que Explodiu no Brasil', 'Seção 1'),
    ('A Filosofia da K-Beauty: Consistência é Tudo', 'Seção 2'),
    ('Ingredientes-Chave da K-Beauty 2026', 'Seção 3'),
    ('Como a K-Beauty Está Moldando a Indústria Brasileira', 'Seção 4'),
    ('K-Beauty e Inclusão: Todos os Tipos de Pele', 'Seção 5'),
]
for i, (t, s) in enumerate(secs, 1):
    make(f'public/artigos/k-beauty-2026-hype/sec{i}.webp', [PALETA['rosaC'], PALETA['roxC'], PALETA['verdC'], PALETA['amC'], PALETA['azC']][i - 1], t, f'Bem Mais Bella • {s}')