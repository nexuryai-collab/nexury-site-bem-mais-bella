#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont

def create_img(w, h, c, label, fn, sub=None):
    img = Image.new('RGB', (w, h), c)
    d = ImageDraw.Draw(img)
    for i in range(0, w, 50):
        d.line([(i, 0), (i, h)], fill=(255,255,255), width=3)
    for i in range(0, h, 50):
        d.line([(0, i), (w, i)], fill=(255,255,255), width=3)
    try:
        ft = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 80)
        fs = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 40)
    except:
        ft = ImageFont.load_default()
        fs = ImageFont.load_default()
    tc = (255,255,255)
    d.text((w//2, h//2-60), label, fill=tc, font=ft, anchor='mm')
    if sub:
        d.text((w//2, h//2+50), sub, fill=tc, font=fs, anchor='mm')
    img.save(fn, 'WEBP', quality=92)
    return fn

base = '/workspace/nexury-site-bem-mais-bella/public/artigos/autoconhecimento-mindfulness-2026'
create_img(1600, 900, (30, 40, 70), 'MINDFULNESS 2026', f'{base}/hero.webp', 'PRESENCA E AUTOCONHECIMENTO')
create_img(1600, 900, (60, 90, 140), 'RESPIRACAO CONSCIENTE', f'{base}/sec1.webp', 'MINDFULNESS NO DIA A DIA')
create_img(1600, 900, (200, 160, 120), 'AUTOCONHECIMENTO', f'{base}/sec2.webp', 'REFLEXAO SEM JULGAMENTO')
create_img(1600, 900, (80, 40, 100), 'ESCRITA REFLEXIVA', f'{base}/sec3.webp', 'CLAcleza EMOCIONAL')
create_img(1600, 900, (140, 60, 90), 'CONEXAO COM OUTRAS', f'{base}/sec4.webp', 'VIDA INTEGRAL')
create_img(1600, 900, (40, 70, 60), 'REVOLUCAO INTERIOR', f'{base}/sec5.webp', 'BEM MAIS BELLA')
print('6 imagens WEBP criadas.')