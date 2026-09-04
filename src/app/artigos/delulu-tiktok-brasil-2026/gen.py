from PIL import Image, ImageDraw, ImageFont
import os, sys

base = "/opt/data/nexury-site-bem-mais-bella/src/app/artigos/delulu-tiktok-brasil-2026"
os.makedirs(base, exist_ok=True)

COLORS = {"hero_bg":"#1a0a2e","sec_bg":"#2d1b4e","accent":"#e85d8a","text":"#ffffff","subtext":"#d4a5ff"}

def create_webp(filename, title, subtitle="", width=1200, height=630):
    img = Image.new("RGB", (width, height), COLORS["hero_bg"])
    draw = ImageDraw.Draw(img)
    for y in range(height):
        r,g,b = 26+int(y/height*20), 10+int(y/height*15), 46+int(y/height*30)
        draw.rectangle([0,y,width,y+1], fill=(r,g,b))
    draw.rectangle([0,height-3,width,height], fill=COLORS["accent"])
    draw.ellipse([width-200,0,width,200], fill=COLORS["accent"])
    try:
        ft = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
        fs = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
    except:
        ft = fs = ImageFont.load_default()
    words = title.split(); lines=[]; cur=""
    for w in words:
        test = (cur+" "+w) if cur else w
        if draw.textlength(test, font=ft) < width-100: cur=test
        else: 
            if cur: lines.append(cur); cur=w
    if cur: lines.append(cur)
    y_start = height//2 - len(lines)*35
    for ln in lines:
        draw.text((50,y_start), ln, fill=COLORS["text"], font=ft); y_start+=40
    if subtitle: draw.text((50,height-80), subtitle, fill=COLORS["subtext"], font=fs)
    img.save(os.path.join(base,filename), "WEBP", quality=85)
    print("Created:", filename)

configs = [
    ("delulu-tiktok-brasil-hero.webp","Delulu TikTok Brasil 2026","HYPE Trend | Bem Mais Bella",1200,630),
    ("delulu-tiktok-brasil-secao-1.webp","O que significa Delulu?","Origem e significado no TikTok",1200,630),
    ("delulu-tiktok-brasil-secao-2.webp","Por que viralizou no Brasil?","Contexto sociocultural do delulu",1200,630),
    ("delulu-tiktok-brasil-secao-3.webp","Delulu e autoestima","Impactos na saude mental feminina",1200,800),
    ("delulu-tiktok-brasil-secao-4.webp","Como usar o delulu","Metodo Bem Mais Bella",1200,800),
    ("delulu-tiktok-brasil-secao-5.webp","Observacao da Lillith","Quando o delulu e pedido de socorro",1200,800),
]
for c in configs: create_webp(*c)
print("All 6 WebP images done.")
