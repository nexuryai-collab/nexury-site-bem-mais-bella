#!/usr/bin/env python3
"""Generate WebP images for vida-com-bebe-2026 article."""
import os
from PIL import Image, ImageDraw, ImageFont

def create_img(w, h, c, label, fn, sub=None):
    img = Image.new('RGB', (w, h), c)
    d = ImageDraw.Draw(img)
    for i in range(0, w, 50):
        d.line([(i, 0), (i, h)], fill=(255, 255, 255), width=3)
    for i in range(0, h, 50):
        d.line([(0, i), (w, i)], fill=(255, 255, 255), width=3)
    for i in range(8):
        cx = w * (0.2 + i * 0.1)
        cy = h * (0.3 + i * 0.06)
        r = 100 + i * 25
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 255, 255), width=4)
    try:
        ft = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 70)
        fs = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 36)
    except Exception:
        ft = ImageFont.load_default()
        fs = ImageFont.load_default()
    tc = (36, 0, 70) if c[0] >= 128 else (255, 255, 255)
    d.text((w // 2, h // 2 - 60), label, fill=tc, font=ft, anchor='mm')
    if sub:
        d.text((w // 2, h // 2 + 50), sub, fill=tc, font=fs, anchor='mm')
    img.save(fn, 'WEBP', quality=92)
    return fn, os.path.getsize(fn) / 1024


base = '/opt/data/nexury-site-bem-mais-bella/public/artigos/vida-com-bebe-2026'
os.makedirs(base, exist_ok=True)

images = [
    ('hero', (36, 0, 70), 'VIDA COM BEBÊ 2026', 'O NOVO HYPE DA MATERNIDADE BRASILEIRA'),
    ('sec1', (106, 90, 205), 'TOQUE PELE COM PELE', 'O RITUAL DE VÍNCIO QUE MUDA TUDO'),
    ('sec2', (245, 245, 250), 'COWORKING PARA MÃES', 'TRABALHO E MATERNIDADE JUNTOS'),
    ('sec3', (84, 89, 95), 'SAÚDE MENTAL MATERNA', 'CUIDAR DE SI É CUIDAR DE TODOS'),
    ('sec4', (247, 37, 133), 'TECNOLOGIA E BEBÊ', 'APPS QUE APOIAM A MÃE'),
    ('sec5', (50, 150, 100), 'COMUNIDADE MATERNA', 'JUNTAS SOMOS MAIS FORTES'),
]

for name, color, label, sub in images:
    fn = f'{base}/{name}.webp'
    path, size = create_img(1600, 800, color, label, fn, sub)
    print(f'OK: {path} ({size:.0f}KB)')

print('\nAll images created!')
