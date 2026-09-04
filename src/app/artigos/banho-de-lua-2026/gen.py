from PIL import Image, ImageDraw, ImageFont
import os, sys

base = "/opt/data/nexury-site-bem-mais-bella/src/app/artigos/banho-de-lua-2026"
os.makedirs(base, exist_ok=True)

COLORS = {"hero_bg":"#2d1b4e","sec_bg":"#1a3a5c","accent":"#e85d8a","text":"#ffffff","subtext":"#b8e0ff"}

def create_webp(filename, title, subtitle="", width=1200, height=630):
    img = Image.new("RGB", (width, height), COLORS["hero_bg"])
    draw = ImageDraw.Draw(img)
    for y in range(height):
        r,g,b = 45+int(y/height*20), 27+int(y/height*15), 78+int(y/height*30)
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
    ("banho-de-lua-2026-hero.webp","Banho de Lua 2026","Ritual Ancestral | Bem Mais Bella",1200,630),
    ("banho-de-lua-2026-secao-1.webp","O que é Banho de Lua?","Origem e significado do ritual","1200,800"),
    ("banho-de-lua-2026-secao-2.webp","A história do Banho de Lua","Tradição brasileira ancestral","1200,800"),
    ("banho-de-lua-2026-secao-3.webp","Receitas de Banho de Lua","3 receitas para fazer em casa","1200,800"),
    ("banho-de-lua-2026-secao-4.webp","Benefícios para a pele","O que a ciência diz","1200,800"),
    ("banho-de-lua-2026-secao-5.webp","Banho de Lua e autoconhecimento","Opinião da Lillith Nogah","1200,800"),
]

for c in configs:
    filename, title, subtitle = c[0], c[1], c[2]
    w = int(c[3].split(",")[0]) if len(c) > 3 else 1200
    h = int(c[3].split(",")[1]) if len(c) > 3 and "," in c[3] else 630
    create_webp(filename, title, subtitle, w, h)

print("All images generated!")
