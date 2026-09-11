from PIL import Image, ImageDraw, ImageFont
import textwrap, os

base = '/workspace/nexury-site-bem-mais-bella/public/artigos'

def make_image(path, w, h, title, subtitle, color_scheme):
    img = Image.new('RGB', (w, h), color_scheme['bg'])
    draw = ImageDraw.Draw(img)
    font_paths = ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/liberation/LiberationSans-Bold.ttf']
    font_title = None; font_sub = None
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                font_title = ImageFont.truetype(fp, int(w * 0.025))
                font_sub = ImageFont.truetype(fp, int(w * 0.015))
                break
            except: continue
    if font_title is None: font_title = ImageFont.load_default(); font_sub = ImageFont.load_default()
    draw.rectangle([0, 0, w, 8], fill=color_scheme['accent'])
    for i in range(3):
        cx = int(w * (0.15 + i * 0.35)); cy = int(h * 0.25); r = int(w * 0.08)
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color_scheme['accent'] + (40,))
    if title:
        lines = textwrap.wrap(title, width=35)
        y = int(h * 0.35)
        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=font_title)
            tw = bbox[2] - bbox[0]
            x = (w - tw) // 2
            draw.text((x, y), line, fill=color_scheme['text'], font=font_title)
            y += int(h * 0.04)
    if subtitle:
        bbox = draw.textbbox((0, 0), subtitle, font=font_sub)
        tw = bbox[2] - bbox[0]
        x = (w - tw) // 2
        draw.text((x, int(h * 0.72)), subtitle, fill=color_scheme['text'], font=font_sub)
    draw.rectangle([0, h-8, w, h], fill=color_scheme['accent'])
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, 'WEBP', quality=92)
    return path

schemes = {
    'culinaria': {'bg': (255, 249, 240), 'accent': (220, 120, 40), 'text': (60, 30, 20)},
}

slug = 'culinaria-consciente-2026'
images = [
    ('hero.webp', 'Culinaria Consciente 2026', 'Alimentacao como ato de cuidado'),
    ('sec1.webp', 'Ingredientes de Verdade', 'Respeite sua origem'),
    ('sec2.webp', 'Receitas Saudaveis', 'Comida que nutre'),
    ('sec3.webp', 'Desperdicio Zero', 'Valorize cada ingrediente'),
    ('sec4.webp', 'Produtor Local', 'Economia que alimenta'),
    ('sec5.webp', 'Cozinhar com Intencao', 'Presenca no processo'),
]

for name, title, subtitle in images:
    path = f'{base}/{slug}/{name}'
    make_image(path, 1200, 630, title, subtitle, schemes['culinaria'])
    print(f'Created: {path}')
print('Done!')
