import os
from PIL import Image, ImageDraw, ImageFont

out = '/workspace/nexury-site-bem-mais-bella/public/images/autocuidado-diario-2026'
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

make('hero',    (235, 248, 240), (15, 60, 40), 'AUTOCUIDADO DIÁRIO', 'Rotina que transforma')
make('secao-1', (245, 250, 248), (15, 60, 40), 'AMANHECER CONSCIENTE')
make('secao-2', (250, 245, 240), (60, 40, 20), 'RITUAIS SIMPLES')
make('secao-3', (248, 245, 252), (30, 20, 60), 'CORPO EM PAZ')
make('secao-4', (252, 248, 245), (60, 20, 20), 'NOITE RESTAURADORA')
make('secao-5', (245, 252, 250), (20, 50, 60), 'MINDFULNESS MODA')
make('secao-6', (250, 248, 240), (40, 60, 20), 'SUA JORNADA')
print("OK")
