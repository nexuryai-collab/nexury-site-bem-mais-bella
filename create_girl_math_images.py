import os
from PIL import Image, ImageDraw, ImageFont
import textwrap

# Create images directory if it doesn't exist
os.makedirs('/workspace/nexury-site-bem-mais-bella/src/app/artigos/girl-math-feminino-2026/images', exist_ok=True)

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
hero_img = create_image(1200, 600, (255, 240, 245), "GIRL MATH 2026: O PODER FEMININO NOS NÚMEROS", (80, 0, 40), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
hero_img.save('/workspace/nexury-site-bem-mais-bella/src/app/artigos/girl-math-feminino-2026/images/hero.webp', 'WEBP')

# Create section 1 image (conceito)
secao1_img = create_image(1200, 600, (245, 230, 240), "O QUE É GIRL MATH?", (80, 0, 40), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao1_img.save('/workspace/nexury-site-bem-mais-bella/src/app/artigos/girl-math-feminino-2026/images/secao-1.webp', 'WEBP')

# Create section 2 image (investimento)
secao2_img = create_image(1200, 600, (235, 245, 235), "INVESTIR EM SI MESMA", (0, 60, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao2_img.save('/workspace/nexury-site-bem-mais-bella/src/app/artigos/girl-math-feminino-2026/images/secao-2.webp', 'WEBP')

# Create section 3 image (consumo inteligente)
secao3_img = create_image(1200, 600, (230, 240, 245), "CONSUMO CONSCIENTE E INTELIGENTE", (0, 40, 80), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao3_img.save('/workspace/nexury-site-bem-mais-bella/src/app/artigos/girl-math-feminino-2026/images/secao-3.webp', 'WEBP')

# Create section 4 image (empreendedorismo)
secao4_img = create_image(1200, 600, (250, 245, 230), "MULHERES EMPREENDEDORAS", (80, 60, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao4_img.save('/workspace/nexury-site-bem-mais-bella/src/app/artigos/girl-math-feminino-2026/images/secao-4.webp', 'WEBP')

# Create section 5 image (independência financeira)
secao5_img = create_image(1200, 600, (240, 235, 250), "CAMINHO PARA A LIBERDADE FINANCEIRA", (60, 0, 80), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao5_img.save('/workspace/nexury-site-bem-mais-bella/src/app/artigos/girl-math-feminino-2026/images/secao-5.webp', 'WEBP')

print("Imagens da Girl Math criadas com sucesso!")