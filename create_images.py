import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

# Create images directory if it doesn't exist
os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/moda-tendencias-2026', exist_ok=True)

# Create a simple function to generate an image with text
def create_image(width, height, background_color, text, text_color, font_path=None):
    img = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(img)
    
    if font_path:
        try:
            font = ImageFont.truetype(font_path, 40)
        except:
            font = ImageFont.load_default()
    else:
        font = ImageFont.load_default()
    
    # Calculate text position
    y_pos = 10
    lines = text.split('\n')
    line_height = 50
    
    for line in lines:
        draw.text((10, y_pos), line, fill=text_color, font=font)
        y_pos += line_height
    
    return img

# Create hero image
hero_img = create_image(1200, 600, (255, 255, 255), "MODA TENDÊNCIAS 2026: O GUARDA-ROUPA DO FUTURO", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
hero_img.save('/workspace/nexury-site-bem-mais-bella/public/images/moda-tendencias-2026/hero.webp', 'WEBP')

# Create section 1 image (cores)
secao1_img = create_image(1200, 600, (240, 245, 230), "CORES DO BRASIL 2026", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao1_img.save('/workspace/nexury-site-bem-mais-bella/public/images/moda-tendencias-2026/secao-1.webp', 'WEBP')

# Create section 2 image (silhuetas)
secao2_img = create_image(1200, 600, (245, 245, 250), "SILHUETAS ARQUITETÔNICAS", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao2_img.save('/workspace/nexury-site-bem-mais-bella/public/images/moda-tendencias-2026/secao-2.webp', 'WEBP')

# Create section 3 image (tecidos)
secao3_img = create_image(1200, 600, (240, 250, 240), "TECIDOS DO FUTURO", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao3_img.save('/workspace/nexury-site-bem-mais-bella/public/images/moda-tendencias-2026/secao-3.webp', 'WEBP')

# Create section 4 image (acessórios)
secao4_img = create_image(1200, 600, (250, 240, 255), "ACESSÓRIOS QUE CONTAM HISTÓRIAS", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao4_img.save('/workspace/nexury-site-bem-mais-bella/public/images/moda-tendencias-2026/secao-4.webp', 'WEBP')

# Create section 5 image (estilo pessoal)
secao5_img = create_image(1200, 600, (245, 255, 245), "ESTILO PESSOAL ACIMA DE TENDÊNCIAS", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao5_img.save('/workspace/nexury-site-bem-mais-bella/public/images/moda-tendencias-2026/secao-5.webp', 'WEBP')

# Create section 6 image (moda inclusiva)
secao6_img = create_image(1200, 600, (255, 250, 245), "MODA INCLUSIVA REAL", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao6_img.save('/workspace/nexury-site-bem-mais-bella/public/images/moda-tendencias-2026/secao-6.webp', 'WEBP')

print("Imagens criadas com sucesso!")