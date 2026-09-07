import os
from PIL import Image, ImageDraw, ImageFont

# Create images directory if it doesn't exist
os.makedirs('/workspace/nexury-site-bem-mais-bela/src/app/artigos/estilo-beleza-modaca-consciente-2026/images', exist_ok=True)

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

# Generate hero image (1)
hero_img = create_image(1200, 600, (240, 245, 250), "MODA CONSCIENTE 2026: TENDÊNCIAS QUE RESPEITAM O CORPO E A TERRA", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
hero_img.save('/workspace/nexury-site-bem-mais-bela/src/app/artigos/estilo-beleza-modaca-consciente-2026/images/hero.webp', 'WEBP')

# Generate section 1 image (tecidos sustentáveis)
secao1_img = create_image(1200, 600, (230, 240, 235), "TECIDOS SUSTENTÁVEIS: DO DESCARTÁVEL AO REUTILIZÁVEL", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao1_img.save('/workspace/nexury-site-bem-mais-bela/src/app/artigos/estilo-beleza-modaca-consciente-2026/images/secao-1.webp', 'WEBP')

# Generate section 2 image (acessórios sustentáveis)
secao2_img = create_image(1200, 600, (245, 245, 250), "ACESSÓRIOS QUE CONTAM HISTÓRIAS: ECOLOGIA E ESTILO", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao2_img.save('/workspace/nexury-site-bem-mais-bela/src/app/artigos/estilo-beleza-modaca-consciente-2026/images/secao-2.webp', 'WEBP')

# Generate section 3 image (estilo para todos os corpos)
secao3_img = create_image(1200, 600, (240, 250, 245), "ESTILO PARA TODOS OS CORPOS: INCLUSIVIDADE E CONFIAÇÃO", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao3_img.save('/workspace/nexury-site-bem-mais-bela/src/app/artigos/estilo-beleza-modaca-consciente-2026/images/secao-3.webp', 'WEBP')

# Generate section 4 image (guarda-roupa versátil)
secao4_img = create_image(1200, 600, (250, 240, 255), "GUARDA-ROUPA VERSÁTIL: MENOS É MAIS", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao4_img.save('/workspace/nexury-site-bem-mais-bela/src/app/artigos/estilo-beleza-modaca-consciente-2026/images/secao-4.webp', 'WEBP')

# Generate section 5 image (beleza caseira)
secao5_img = create_image(1200, 600, (245, 255, 245), "BELEZA CASEIRA: CUIDADOS NATURAIS E AUTENTICIDADE", (0, 0, 0), '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
secao5_img.save('/workspace/nexury-site-bem-mais-bela/src/app/artigos/estilo-beleza-modaca-consciente-2026/images/secao-5.webp', 'WEBP')

print("Imagens criadas com sucesso!")