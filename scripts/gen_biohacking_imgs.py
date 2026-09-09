from PIL import Image, ImageDraw, ImageFont
import os

base = 'public/artigos/biohacking-feminino-2026'
os.makedirs(base, exist_ok=True)

colors = [(36,0,70), (247,37,133), (245,245,250), (235,230,220), (84,89,95), (255,165,0)]
labels = [
    ('BIOHACKING FEMININO', 'OTIMIZAR SEU CORPO E MENTE'),
    ('NUTRICAO E ENERGIA', 'ALIMENTE SEU POTENCIAL'),
    ('SONO E RECUPERACAO', 'DURMA, RECUPERE, EVOLUA'),
    ('EXERCICIO E MOVIMENTO', 'CORPO E FORCA EM HARMONIA'),
    ('MENTE E CONCENTRACAO', 'CLARANZA E FOCO'),
    ('AUTOCONHECIMENTO E BIOMETRIA', 'ENTENDA SEU CORPO')
]

try:
    ft = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 80)
    fs = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 40)
except:
    ft = ImageFont.load_default()
    fs = ImageFont.load_default()

names = ['hero'] + [f'sec{i}' for i in range(1, 6)]

for i, (color, (label, sub), fn_name) in enumerate(zip(colors, labels, names)):
    img = Image.new('RGB', (1600, 800), color)
    d = ImageDraw.Draw(img)
    for x in range(0, 1600, 50):
        d.line([(x, 0), (x, 800)], fill=(255,255,255), width=3)
    for y in range(0, 800, 50):
        d.line([(0, y), (1600, y)], fill=(255,255,255), width=3)
    for j in range(8):
        cx = 1600*(0.2+j*0.1)
        cy = 800*(0.3+j*0.06)
        r = 100+j*25
        d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=(255,255,255), width=4)
    tc = (36,0,70) if color[0] >= 128 else (255,255,255)
    d.text((800, 340), label, fill=tc, font=ft, anchor='mm')
    d.text((800, 450), sub, fill=tc, font=fs, anchor='mm')
    fn = f'{base}/{fn_name}.webp'
    img.save(fn, 'WEBP', quality=92)
    size = os.path.getsize(fn)/1024
    print(f'OK: {fn} ({size:.0f}KB)')

print('All images created!')