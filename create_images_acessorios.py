import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/acessorios-sustentaveis-2026', exist_ok=True)

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

# Hero
hero_img = create_image(1200, 600, (255, 248, 240), "ACESSÓRIOS SUSTENTÁVEIS 2026\nBRASIL EM FOCO", (70, 40, 80))
hero_img.save('/workspace/nexury-site-bem-mais-bella/public/images/acessorios-sustentaveis-2026/hero.webp', 'WEBP')

# Section 1
secao1_img = create_image(1200, 600, (240, 245, 230), "JOIAS DE ARTESANATO\nBRASILEIRO", (60, 70, 40))
secao1_img.save('/workspace/nexury-site-bem-mais-bella/public/images/acessorios-sustentaveis-2026/secao-1.webp', 'WEBP')

# Section 2
secao2_img = create_image(1200, 600, (245, 245, 255), "TÊNIS E CALÇADOS\nECO-FRIENDLY", (50, 60, 120))
secao2_img.save('/workspace/nexury-site-bem-mais-bella/public/images/acessorios-sustentaveis-2026/secao-2.webp', 'WEBP')

# Section 3
secao3_img = create_image(1200, 600, (255, 245, 240), "BOLSAS DE COURO\nDE CACTO E ABACAXI", (100, 50, 40))
secao3_img.save('/workspace/nexury-site-bem-mais-bella/public/images/acessorios-sustentaveis-2026/secao-3.webp', 'WEBP')

# Section 4
secao4_img = create_image(1200, 600, (240, 255, 245), "ACESSÓRIOS DE\nSEGUNDA MÃO", (30, 90, 60))
secao4_img.save('/workspace/nexury-site-bem-mais-bella/public/images/acessorios-sustentaveis-2026/secao-4.webp', 'WEBP')

# Section 5
secao5_img = create_image(1200, 600, (250, 240, 250), "RITUAIS DE\nREPARO E REUSO", (100, 40, 90))
secao5_img.save('/workspace/nexury-site-bem-mais-bella/public/images/acessorios-sustentaveis-2026/secao-5.webp', 'WEBP')

# Section 6
secao6_img = create_image(1200, 600, (255, 250, 235), "COMO ESCOLHER\nACESSÓRIOS CONSCIENTES", (80, 60, 30))
secao6_img.save('/workspace/nexury-site-bem-mais-bella/public/images/acessorios-sustentaveis-2026/secao-6.webp', 'WEBP')

print("Imagens de Acessórios Sustentáveis 2026 criadas com sucesso!")
