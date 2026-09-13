from PIL import Image, ImageDraw, ImageFont
import os
import sys

base = "/workspace/nexury-site-bem-mais-bella/public/artigos/autocuidado-consciente-hype-2026-resiliencia"
os.makedirs(base, exist_ok=True)

# Cores: (r,g,b) - tons suaves de azul e verde para autocuidado
colors = {
    "hero": ((30, 60, 100), (100, 180, 255)),
    "sec1": ((40, 80, 60), (140, 220, 180)),
    "sec2": ((80, 40, 80), (220, 180, 220)),
    "sec3": ((60, 60, 100), (180, 180, 220)),
    "sec4": ((100, 60, 40), (220, 180, 140)),
    "sec5": ((50, 50, 50), (180, 180, 180)),
}

try:
    font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 56)
    font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
except:
    font_title = None
    font_small = None

def create_image(filename, bg, fg, title, subtitle):
    img = Image.new("RGB", (1920, 1080))
    draw = ImageDraw.Draw(img)
    # Gradiente vertical
    for y in range(1080):
        t = y / 1080
        r = int(bg[0] + (fg[0]-bg[0])*t)
        g = int(bg[1] + (fg[1]-bg[1])*t)
        b = int(bg[2] + (fg[2]-bg[2])*t)
        draw.line([(0,y),(1920,y)], fill=(r,g,b))
    # Título
    if font_title:
        draw.text((120, 300), title, fill="#FFFFFF", font=font_title)
    draw.text((120, 420), subtitle, fill="#FFFFFF", font=font_small)
    # Rodapé
    draw.text((120, 900), "Bem Mais Bella · Lillith Nogah", fill="#FFFFFF", font=font_small)
    img.save(os.path.join(base, filename), "WEBP", quality=95)

# Cria as 6 imagens
create_image("hero.webp", (30,60,100), (100,180,255), "Autocuidado Consciente 2026", "Transformando a Mente e o Corpo")
create_image("sec1.webp", (40,80,60), (140,220,180), "Mindfulness Diário", "Presença no momento presente")
create_image("sec2.webp", (80,40,80), (220,180,220), "Meditação Guiada", "Paz interior em minutos")
create_image("sec3.webp", (60,60,100), (180,180,220), "Respiração Consciente", "Antídoto para o estresse")
create_image("sec4.webp", (100,60,40), (220,180,140), "Movimento e Nutrição", "Corpo e mente em equilíbrio")
create_image("sec5.webp", (50,50,50), (180,180,180), "Rituais Diários", "Sono, alimentação e conexão")

# Mostra os tamanhos
for f in sorted(os.listdir(base)):
    if f.endswith(".webp"):
        size = os.path.getsize(os.path.join(base, f))
        print(f"{f}: {size} bytes")