from PIL import Image, ImageDraw, ImageFont
import os

BASE = '/workspace/nexury-site-bem-mais-bella/public/artigos'

def create_img(w, h, c, label, fn, sub=None):
    img = Image.new('RGB', (w, h), c)
    d = ImageDraw.Draw(img)
    for i in range(0, w, 50):
        d.line([(i, 0), (i, h)], fill=(255,255,255), width=3)
    for i in range(0, h, 50):
        d.line([(0, i), (w, i)], fill=(255,255,255), width=3)
    for i in range(8):
        cx = w*(0.2+i*0.1)
        cy = h*(0.3+i*0.06)
        r = 100+i*25
        d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=(255,255,255), width=4)
    try:
        ft = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 80)
        fs = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 40)
    except:
        ft = ImageFont.load_default()
        fs = ImageFont.load_default()
    tc = (36,0,70) if c[0] >= 128 else (255,255,255)
    d.text((w//2, h//2-60), label, fill=tc, font=ft, anchor='mm')
    if sub:
        d.text((w//2, h//2+50), sub, fill=tc, font=fs, anchor='mm')
    img.save(fn, 'WEBP', quality=92)
    return fn, os.path.getsize(fn)/1024

def gen(base, colors, labels):
    os.makedirs(base, exist_ok=True)
    names = ['hero'] + [f'sec{j}' for j in range(1, 6)]
    for color, (label, sub), fn_name in zip(colors, labels, names):
        fn = f'{base}/{fn_name}.webp'
        path, size = create_img(1600, 800, color, label, fn, sub)
        print(f'OK: {path} ({size:.0f}KB)')

gen(f'{BASE}/mindfulness-feminino-hype-2026',
    [(36,0,70), (247,37,133), (245,245,250), (235,230,220), (84,89,95), (255,165,0)],
    [( 'MINDFULNESS FEMININO', 'PAZ NO CAOS'),
     ('RESPIRACAO', 'ANCLA O CORPO'),
     ('PRESENCAS', 'NO DIA A DIA'),
     ('CICLO FEMININO', 'HONRAR O CORPO'),
     ('MEDITACAO', 'GUIADA E LIVRE'),
     ('TRANSFORMACAO', 'NO PRESENTE')])

gen(f'{BASE}/journaling-feminino-hype-2026',
    [(36,0,70), (247,37,133), (245,245,250), (235,230,220), (84,89,95), (255,165,0)],
    [( 'JOURNALING FEMININO', 'ESCREVER E CURAR'),
     ('FLUXO LIVRE', 'SEM JULGAMENTO'),
     ('PROMPTS', 'PARA AUTOCONHECIMENTO'),
     ('VISUAL', 'DESENHOS E CORES'),
     ('GRATIDAO', 'DA MULHER'),
     ('TRANSFORMACAO', 'NO PAPEL')])

print('All images done!')
