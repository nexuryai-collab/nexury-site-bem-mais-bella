#!/usr/bin/env python3
"""Gera as 6 imagens WebP (hero + 5 secoes) para os artigos de mindfulness e
saude mental do Bem Mais Bella, usando a paleta oficial do site.

Paleta Bem Mais Bella:
  #240046  Roxo escuro
  #54595F  Cinza medio
  #9AA4AF  Cinza claro
  #F72585  Rosa vibrante

Imagem: 1600x800, sem texto (fotografia documental abstrata).
"""
import os
from PIL import Image, ImageDraw, ImageFilter

ROOT = '/workspace/nexury-site-bem-mais-bella/public/artigos'
PAL = [(36, 0, 70), (84, 89, 95), (154, 164, 175), (247, 37, 133)]


def make(base, slug, colors, labels, sub=None):
    d = f'{ROOT}/{slug}'
    os.makedirs(d, exist_ok=True)
    out = []
    for i, ((c, lab), fn) in enumerate(zip(colors, ['hero'] + [f'sec{i}' for i in range(1, 6)])):
        w, h = 1600, 800
        img = Image.new('RGB', (w, h), c)
        dr = ImageDraw.Draw(img)
        # gradiente vertical suave
        for y in range(h):
            t = y / h
            r = int(c[0] + (c[0] * 0.12) * t)
            g = int(c[1] + (c[1] * 0.12) * t)
            b = int(c[2] + (c[2] * 0.12) * t)
            dr.line([(0, y), (w, y)], fill=(max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b))))
        # circulos desfocados para profundidade
        for j in range(6):
            cx = int(w * (0.15 + j * 0.14))
            cy = int(h * (0.3 + (j % 2) * 0.4))
            r = 90 + j * 40
            cc = PAL[(j + 1) % 4]
            ov = Image.new('RGBA', (w, h), (0, 0, 0, 0))
            od = ImageDraw.Draw(ov)
            od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=cc + (45,))
            img = Image.alpha_composite(img.convert('RGBA'), ov).convert('RGB')
        img = img.filter(ImageFilter.GaussianBlur(1.2))
        fn_path = f'{d}/{fn}.webp'
        img.save(fn_path, 'WEBP', quality=88)
        out.append((fn_path, os.path.getsize(fn_path) / 1024))
    return out


# 1. mindfulness-2026
make(ROOT, 'mindfulness-2026',
     [(36, 0, 70), (84, 89, 95), (154, 164, 175), (247, 37, 133), (200, 180, 210), (60, 40, 90)],
     None)

# 2. autocuidado-mental-2026
make(ROOT, 'autocuidado-mental-2026',
     [(36, 0, 70), (84, 89, 95), (154, 164, 175), (247, 37, 133), (200, 180, 210), (60, 40, 90)],
     None)

# 3. saude-mental-ansiedade-hype-2026
make(ROOT, 'saude-mental-ansiedade-hype-2026',
     [(36, 0, 70), (84, 89, 95), (154, 164, 175), (247, 37, 133), (200, 180, 210), (60, 40, 90)],
     None)

# 4. sono-recuperacao-feminina-2026
make(ROOT, 'sono-recuperacao-feminina-2026',
     [(36, 0, 70), (60, 40, 90), (154, 164, 175), (84, 89, 95), (200, 180, 210), (247, 37, 133)],
     None)

# 5. terapias-holisticas-2026
make(ROOT, 'terapias-holisticas-2026',
     [(36, 0, 70), (84, 89, 95), (154, 164, 175), (247, 37, 133), (200, 180, 210), (60, 40, 90)],
     None)

print('OK: 5 artigos x 6 imagens gerados')