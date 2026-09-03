import os
from PIL import Image, ImageDraw, ImageFont

# Create images directory
os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/beleza-caseira-2026', exist_ok=True)

def create_image(width, height, background_color, text, text_color):
    img = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 40)
    except:
        font = ImageFont.load_default()
    
    y_pos = 10
    lines = text.split('\n')
    line_height = 50
    
    for line in lines:
        draw.text((10, y_pos), line, fill=text_color, font=font)
        y_pos += line_height
    
    return img

# Create hero image
hero_img = create_image(1200, 600, (255, 245, 250), "BELEZA CASEIRA 2026: O HYPE DO DIY BRASILEIRO", (80, 30, 60))
hero_img.save('/workspace/nexury-site-bem-mais-bella/public/images/beleza-caseira-2026/hero.webp', 'WEBP')

# Create section 1 image (máscaras)
secao1_img = create_image(1200, 600, (255, 240, 230), "MÁSCARAS NATURAIS FACIAIS", (100, 50, 30))
secao1_img.save('/workspace/nexury-site-bem-mais-bella/public/images/beleza-caseira-2026/secao-1.webp', 'WEBP')

# Create section 2 image (cabelo)
secao2_img = create_image(1200, 600, (240, 255, 245), "TRATAMENTOS CAPILARES CASEIROS", (30, 80, 60))
secao2_img.save('/workspace/nexury-site-bem-mais-bella/public/images/beleza-caseira-2026/secao-2.webp', 'WEBP')

# Create section 3 image (maquiagem)
secao3_img = create_image(1200, 600, (245, 245, 255), "MAQUIAGEM NATURAL E SAUDÁVEL", (50, 50, 100))
secao3_img.save('/workspace/nexury-site-bem-mais-bella/public/images/beleza-caseira-2026/secao-3.webp', 'WEBP')

# Create section 4 image (skincare)
secao4_img = create_image(1200, 600, (255, 255, 240), "SKINCARE SIMPLES E EFICAZ", (100, 80, 30))
secao4_img.save('/workspace/nexury-site-bem-mais-bella/public/images/beleza-caseira-2026/secao-4.webp', 'WEBP')

# Create section 5 image (rituais)
secao5_img = create_image(1200, 600, (240, 245, 255), "RITUAIS DE BELEZA FEMININA", (60, 60, 100))
secao5_img.save('/workspace/nexury-site-bem-mais-bella/public/images/beleza-caseira-2026/secao-5.webp', 'WEBP')

# Create section 6 image (autocuidado)
secao6_img = create_image(1200, 600, (255, 240, 245), "BELEZA E AUTOCUIDADO", (100, 30, 60))
secao6_img.save('/workspace/nexury-site-bem-mais-bella/public/images/beleza-caseira-2026/secao-6.webp', 'WEBP')

print("Imagens de Beleza Caseira 2026 criadas com sucesso!")
