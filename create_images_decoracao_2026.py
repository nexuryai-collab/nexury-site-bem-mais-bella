from PIL import Image, ImageDraw, ImageFont
import os

img_dir = 'public/images/decoracao-sustentavel-2026'
os.makedirs(img_dir, exist_ok=True)

images = [
    ('eco-materiais.webp', (255, 245, 250), 'MATERIAIS ECO-FRIENDLY\nSustentáveis e naturais', (100, 80, 70)),
    ('upcycling-criativo.webp', (250, 255, 245), 'UPCYCLING CRIATIVO\nReutilizando com estilo', (120, 80, 50)),
    ('plantas-ambiente.webp', (255, 250, 250), 'PLANTAS E BIOPHILIA\nConexão com a natureza', (80, 50, 120)),
    ('iluminacao-natural.webp', (255, 248, 240), 'LUMINAÇÃO NATURAL\nAproveitando a luz do sol', (80, 80, 100)),
    ('espaco-proposito.webp', (255, 255, 240), 'PLANO DE 6 MESES\nTransformando seu espaço', (100, 100, 50)),
]

for fname, bg, text, color in images:
    img = Image.new('RGB', (1200, 600), bg)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 45)
    except:
        font = ImageFont.load_default()
    y_pos = 200
    lines = text.split('\n')
    for line in lines:
        draw.text((50, y_pos), line, fill=color, font=font)
        y_pos += 60
    img.save(os.path.join(img_dir, fname), 'WEBP')
    print('Created ' + fname)

print('All images done!')
