from PIL import Image, ImageDraw, ImageFont
import os

base = '/opt/data/nexury-site-bem-mais-bella/public/artigos/autocuidado-mental-2026'
os.makedirs(base, exist_ok=True)

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
    if sub: d.text((w//2, h//2+50), sub, fill=tc, font=fs, anchor='mm')
    img.save(fn, 'WEBP', quality=92)
    print(f"OK: {fn} ({os.path.getsize(fn)/1024:.0f}KB)")

entries = [
    ((36,0,70), "AUTOCUIDADO MENTAL 2026", "NUTRA SUA MENTE E ALMA"),
    ((247,37,133), "MINDFULNESS DIARIO", "PRESENCA E CALMA"),
    ((85,135,245), "MOVIMENTO CONSCIENTE", "CORPO E MENTE UNIDOS"),
    ((50,150,100), "JORNAL TERAPEUTICO", "ESCREVA SUAS EMOÇOES"),
    ((255,140,0), "LIMITES SAUDAVEIS", "PROTEJA SUA ENERGIA"),
    ((106,90,205), "GRATIDÃO E CURA", "CADA DIA UMA NOVA CHANCE"),
]

for i, (c, l, s) in enumerate(entries):
    fn_name = 'hero' if i == 0 else f'sec{i}'
    create_img(1600, 800, c, l, f"{base}/{fn_name}.webp", s)