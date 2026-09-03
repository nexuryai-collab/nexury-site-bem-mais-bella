import os
from PIL import Image, ImageDraw, ImageFont

out = '/workspace/nexury-site-bem-mais-bella/public/images/brazilcore-hype-2026-adaptado'
os.makedirs(out, exist_ok=True)
fp = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
font_lg = ImageFont.load_default()
font_md = ImageFont.load_default()

def make(name, bg, fg, t1, t2=''):
    img = Image.new('RGB', (1200, 600), bg)
    d = ImageDraw.Draw(img)
    d.text((40, 240), t1, fill=fg, font=font_lg)
    if t2:
        d.text((40, 320), t2, fill=fg, font=font_md)
    img.save(f'{out}/{name}.webp', 'WEBP')

make('hero',       (255, 245, 235), (60, 30, 10), 'BRAZILCORE 2026', 'Orgulho brasileiro em alta')
make('secao-1',    (255, 235, 220), (60, 30, 10), 'SOMOS DAQUI')
make('secao-2',    (240, 255, 240), (20, 50, 30), 'CULTURA POP BR')
make('secao-3',    (250, 240, 255), (40, 20, 60), 'FUNK E ESTILO')
make('secao-4',    (255, 250, 230), (80, 50, 10), 'NORDESTE POWER')
make('secao-5',    (240, 250, 255), (20, 40, 70), 'BELEZA TROPICAL')
make('secao-6',    (255, 245, 245), (90, 30, 40), 'ORGULHO DE SER')
print("OK")