from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('/workspace/nexury-site-bem-mais-bella/public/images/cripto-feminino-prosperidade-2026', exist_ok=True)

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

# Hero image - Mulher com gráfico
hero = create_image(1200, 600, (30, 60, 120), "CRIPTRO FEMININO 2026\nProsperidade Digital da Mulher", (255, 255, 255))
hero.save('/workspace/nexury-site-bem-mais-bella/public/images/cripto-feminino-prosperidade-2026/hero.webp', 'WEBP')

# Section 1 - Crescimento de mulheres investindo
sec1 = create_image(1200, 600, (40, 100, 180), "38% dos Investidores em Cripto São Mulheres\nCrescimento de 15% em 2026", (255, 255, 255))
sec1.save('/workspace/nexury-site-bem-mais-bella/public/images/cripto-feminino-prosperidade-2026/sec1.webp', 'WEBP')

# Section 2 - Estratégias DCA
sec2 = create_image(1200, 600, (60, 140, 100), "Estratégia DCA\nInvestimento Regular e Consistente", (255, 255, 255))
sec2.save('/workspace/nexury-site-bem-mais-bella/public/images/cripto-feminino-prosperidade-2026/sec2.webp', 'WEBP')

# Section 3 - Carteiras Diversificadas
sec3 = create_image(1200, 600, (180, 120, 40), "Carteiras Diversificadas\nBitcoin, Ethereum, Altcoins e Stablecoins", (255, 255, 255))
sec3.save('/workspace/nexury-site-bem-mais-bella/public/images/cripto-feminino-prosperidade-2026/sec3.webp', 'WEBP')

# Section 4 - Educação
sec4 = create_image(1200, 600, (120, 60, 140), "Educação é a Chave\nCanais, Cursos e Comunidades", (255, 255, 255))
sec4.save('/workspace/nexury-site-bem-mais-bella/public/images/cripto-feminino-prosperidade-2026/sec4.webp', 'WEBP')

# Section 5 - Riscos e Proteção
sec5 = create_image(1200, 600, (160, 40, 80), "Riscos e Como se Proteger\nEducação e Disciplina", (255, 255, 255))
sec5.save('/workspace/nexury-site-bem-mais-bella/public/images/cripto-feminino-prosperidade-2026/sec5.webp', 'WEBP')

# Section 6 - Futuro
sec6 = create_image(1200, 600, (200, 80, 60), "O Futuro do Cripto Feminino\nAutonomia e Liberdade", (255, 255, 255))
sec6.save('/workspace/nexury-site-bem-mais-bella/public/images/cripto-feminino-prosperidade-2026/sec6.webp', 'WEBP')

print("Imagens cripto-feminino-prosperidade-2026 criadas com sucesso!")