import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/nutricao-saudavel-2026', exist_ok=True)

def create_image(width, height, background_color, text, text_color):
    img = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 36)
    except:
        font = ImageFont.load_default()
    draw.text((10, height//2 - 20), text, fill=text_color, font=font)
    return img

# Create hero image
hero_img = create_image(1200, 600, (255, 255, 255), "NUTRIÇÃO SAUDÁVEL 2026: COMER COM PROPÓSITO", (0, 0, 0))
hero_img.save('/workspace/nexury-site-bem-mais-bella/public/images/nutricao-saudavel-2026/hero.webp', 'WEBP')

# Create section images
images_config = [
    ('secao-1.webp', (240, 255, 240), "ALIMENTAÇÃO CONSCIENTE NO BRASIL"),
    ('secao-2.webp', (255, 250, 240), "SUPERALIMENTOS BRASILEIROS"),
    ('secao-3.webp', (240, 250, 255), "PLANTAS MEDICINAIS BRASILEIRAS"),
    ('secao-4.webp', (255, 245, 240), "RECEITAS FUNCIONAIS"),
    ('secao-5.webp', (245, 255, 250), "RELAÇÃO EMOCIONAL COM A COMIDA"),
    ('secao-6.webp', (250, 245, 255), "O FUTURO DA NUTRIÇÃO BRASILEIRA"),
]

for filename, bg_color, text in images_config:
    img = create_image(1200, 600, bg_color, text, (0, 0, 0))
    img.save(f'/workspace/nexury-site-bem-mais-bella/public/images/nutricao-saudavel-2026/{filename}', 'WEBP')

print("Imagens de nutrição criadas com sucesso!")