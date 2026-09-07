# Bem Mais Bella — instruções para quem abrir este repositório

Este arquivo é lido automaticamente pelo Hermes, pelo Claude Code, pelo Cursor e pelo Codex quando o agente abre esta pasta. Ele é o ponto de entrada: leia até o fim antes de mexer em qualquer coisa.

Última revisão: **2026-09-07**.

---

## 1. As três regras que não se quebram

**1. Tudo é assinado só por Lillith Nogah.**
Não pode aparecer "Nexus", "Fellipe Lelis", "equipe" nem nome de ferramenta em nada voltado à leitora — nem em texto, nem em frontmatter, nem em rodapé. Lillith é apresentada no site como **pseudônimo**: uma voz editorial, não uma pessoa com CPF. Isso está escrito em `/sobre-nos` e é decisão fechada.

**2. Número só com fonte.**
A página `/sobre-nos` promete à leitora: *"Se não dá para verificar, não entra."* Isso já obrigou a remover 174 estatísticas inventadas, institutos que não existem e pesquisadores fictícios. Vale para tudo que for gerado daqui em diante: se você não conferiu na origem, escreva a frase sem o número. **Preferimos uma afirmação sem estatística a uma estatística sem origem.**

**3. Nada é publicado sem o Fellipe pedir.**
O deploy é manual e é decisão dele. Gerar, escrever e buildar, sim. Publicar, só quando ele mandar.

A política completa está em `/politica-editorial` (código em `src/app/politica-editorial/page.tsx`) e as regras por área saem de `src/lib/taxonomia.ts`.

---

## 2. Onde está a verdade do projeto

| Preciso mexer em… | Arquivo |
|---|---|
| A árvore do site (áreas, subcategorias, vozes, regras editoriais) | `src/lib/taxonomia.ts` |
| Como os artigos são lidos do disco (frontmatter, capas, imagens de seção) | `src/lib/artigos.ts` |
| Ofertas, achadinhos, produtos, links de afiliado | `src/lib/ofertas.ts` |
| Datas (formatação em português, sem `Intl`) | `src/lib/data.ts` |
| Fundo/foto das categorias | `src/components/FundoTematico.tsx` |
| Animações e acessibilidade de movimento | `src/components/Motion.tsx` + `src/components/Movimento.tsx` |

**`src/lib/taxonomia.ts` é fonte única.** Menu do topo, rodapé, páginas de categoria, sitemap e `CATEGORIAS` derivam dela. Não recrie listas de categoria à mão em componente nenhum — foi exatamente esse problema que ela resolveu.

**Área editorial sem artigo não entra no menu**, automaticamente, porque o menu sai do acervo (`areasVisiveis()`), não de uma flag. Não existe chave para virar quando o primeiro artigo sair.

---

## 3. Como os artigos funcionam

Cada artigo é um `artigo.md` com frontmatter + corpo, em qualquer profundidade dentro de `src/app/`. O leitor varre tudo e normaliza — o acervo tem frontmatter inconsistente por motivos históricos (`publishedAt` / `publishDate` / `date` / `data`, `category` / `categoria`, `author` / `autor`), e `artigos.ts` aceita todas as variantes.

**Regras de arquivo:**

- **Slug só com ASCII.** Slug com acento vira 404 no export estático. Já aconteceu duas vezes.
- **Feche o frontmatter.** Já houve cinco artigos com o corpo inteiro dentro de um escalar YAML (`conteudo: |`) sem o `---` de fechamento — o `gray-matter` engolia o arquivo e a página saía vazia.
- **Capas em `public/artigos/<slug>/hero.webp`**, imagens de seção em `sec1.webp`, `sec2.webp`… O leitor prefere esse caminho ao que estiver no frontmatter, de propósito.
- **Imagem no corpo abaixo de 20 KB é descartada** na renderização, e `![Hero](...)` repetido no texto também — a capa já está no topo da página.

**Nunca deixe rodapé de máquina no texto publicado.** Coisas como "Total de palavras: 2.678", listas de caminho de imagem, "Artigo gerado automaticamente pelo Nexus" ou caminho `/workspace/...` já vazaram para leitoras. `limparRodapeDeMaquina()` em `artigos.ts` filtra os padrões conhecidos — se você inventar um rodapé novo, ele passa.

---

## 3b. Como escrever um artigo novo

Este é o contrato. Quem escreve segue; o validador cobra.

### O arquivo

Crie `src/app/<categoria>/<sub>/artigos/<slug>/artigo.md`. O slug é **só letras minúsculas, números e hífen** — sem acento, sem maiúscula. E ele tem que ser igual ao nome da pasta.

```markdown
---
title: "Título completo do artigo"
slug: nome-do-artigo-2026
description: "Uma frase que o Google mostra no resultado. Sem ela, ele inventa uma."
category: "Saúde e Bem-Estar"
subcategory: "Bem-Estar"
author: "Lillith Nogah"
publishDate: "2026-09-06"
readingTime: "8 min"
---

# Título completo do artigo

Abertura. Duas ou três frases que dizem para quem é o texto.

## Primeiro assunto

...

## Observação de Lillith Nogah

> Um parágrafo em primeira pessoa, de experiência. É a marca da casa.

---

**Leia também:**
- [Título de um artigo que existe](/artigos/slug-que-existe)
```

**Feche o frontmatter com `---`.** Já houve cinco artigos com o corpo inteiro dentro de um escalar YAML sem fechamento — todos saíram como página em branco, e ninguém percebeu por dias.

**Use `##` de verdade.** As imagens do corpo são distribuídas entre os `<h2>`. Sem eles, o texto sai como paredão e sem foto nenhuma.

### As imagens — o ponto que mais deu problema

**Não crie arquivo de imagem vazio.** Foram 37 imagens de 0 byte commitadas de uma vez; para a leitora, isso é ícone de imagem quebrada no meio do texto. **Artigo sem imagem é melhor que artigo com imagem quebrada** — o site tem fundo temático por categoria e cobre o buraco sozinho.

Quem escreve o texto **não precisa gerar imagem**. Deixe a pasta sem imagem e avise; quem orquestra gera com o Higgsfield e instala em:

```
public/artigos/<slug>/hero.webp    capa      (mínimo 20 KB, 16:9)
public/artigos/<slug>/sec1.webp    seção 1
public/artigos/<slug>/sec2.webp    seção 2
public/artigos/<slug>/sec3.webp    seção 3
```

Regras da imagem, aprendidas errando: **sem nenhum texto dentro da imagem** (o modelo escreve errado e em inglês), **fotografia documental, nunca página de revista**, e a cena tem que ser o assunto real daquela seção — descrita em inglês, sem passar o título em português.

### O que nunca entra no texto

- Número, estudo, instituto ou pesquisador que você não conferiu na origem.
- Nome de pessoa real associado a algo que ela não disse publicamente.
- "Nexus", "Fellipe Lelis", "equipe", nome de ferramenta.
- Rodapé de geração: contagem de palavras, lista de caminhos de imagem, `[IMAGEM: ...]`, caminho `/workspace/`.

### Antes de commitar, rode

```bash
node scripts/checar-artigos.mjs <slug>
```

Ele verifica frontmatter, slug, autoria, imagens de 0 byte, capa abaixo do mínimo, rodapé de máquina, data no futuro e slug duplicado. **Erro bloqueia publicação; aviso é para decidir.** Se ele reprovar, conserte — não commite por cima.

Depois, com o artigo aprovado:

```bash
node scripts/atualizar-busca.mjs && node scripts/atualizar-home.mjs && npm run build
```

## 4. Comandos

```bash
npm run build
```

Depois de escrever, editar ou arquivar artigo, ou de trocar capa, rode **os dois**, nessa ordem — senão a home e a busca ficam apontando para o acervo antigo:

```bash
node scripts/atualizar-busca.mjs && node scripts/atualizar-home.mjs
```

Publicar (**só quando o Fellipe pedir**):

```bash
npx wrangler pages deploy out --project-name nexury-site-bem-mais-bella --branch master --commit-dirty=true
```

Se o build reclamar `EBUSY ... rmdir out`, tem servidor local segurando a pasta. Mate o processo que ocupa a porta antes de buildar.

---

## 5. Estado em 2026-09-06 (medido no `out/`, não estimado)

- **142 artigos**, 170 páginas geradas, 163 URLs no sitemap.
- **0 artigo sem capa**, 0 com capa fraca, **0 sem imagem no corpo**. São 428 imagens de seção + 11 fotos de categoria, geradas no Higgsfield (Recraft V4.1 nas capas, Z-Image nas internas).
- **0 imagem quebrada**, 0 página 404, 0 vazamento de rodapé de máquina, 0 erro de console.

### Rotas que existem e ainda não têm conteúdo

- **`/famosos-e-entretenimento`** — área estruturada, **sem matéria**. A regra da área está publicada: cobertura de pessoa real só a partir de **fato atribuível** (o que a pessoa publicou, disse em entrevista ou anunciou), com a origem no texto. Rumor, boato e "fontes próximas" não entram. Foi o padrão mais conservador entre três caminhos; a escolha final é do Fellipe.
- **`/compras`** — vitrine estruturada, **sem produto**. A camada de oferta (`src/lib/ofertas.ts`) e o bloco no fim dos artigos ja funcionam; falta so o produto. **O "Bella Studio" — site, loja e CRM feitos pela plataforma — foi adiado para a fase 2** (decisao do Fellipe, 07/09/2026), entao nao ha backend, conta nem pagamento a construir agora: o site segue estatico. Os itens saem de `src/lib/ofertas.ts`. **Nunca coloque produto de mentira ali para a página não ficar vazia.**

### Bloqueios de lançamento resolvidos em 06/09 (fim do dia)

- **`og:image` apontava para `http://localhost:3000`** — todo compartilhamento em WhatsApp, Instagram e Facebook ia sem imagem. Resolvido com `metadataBase` no layout. Artigos ganharam `canonical` absoluto.
- **A newsletter era falsa.** O formulário esperava 1,5s e respondia *"✓ Enviado com sucesso! Verifique seu e-mail"* sem enviar nada, descartando o endereço. Substituída por uma página que diz que a newsletter não está aberta. **Não recolocar formulário sem serviço de envio ligado.**
- **`/monetize` vendia audiência inventada** — "alcance 8.000+ mulheres engajadas" num site que nunca esteve no ar, mais a meta interna "R$ 2.000 até 30/11" visível a qualquer um. Virou rascunho `noindex`, só com números contados do acervo.
- **`/viagens` publicava manchetes falsas** vindas de `NOTICIAS_MOCK`, atribuídas a instituições e pessoas reais ("USP Lança Cartilha…", "Lula Sanciona Três Leis…"). Rota redirecionada para `/estilo-de-vida` e tirada do índice. **Nunca renderizar `mock-data` em rota pública.**
- **`/logo`** (preview interno da marca) saiu do índice.

### Aberto

1. **13 artigos datados no futuro** (até 25/09/2026) e **22 sem data nenhuma**. Os futuros aparecem em `/em-alta` numa seção própria, "já escrito, ainda por sair", em vez de mentirem ser novidade de hoje. Corrigir as datas é decisão editorial.
2. **Worker de comentários não publicado** — `workers/comentarios/` está pronto, falta rodar o `wrangler d1 create`.
3. **BLOQUEIO DE LANÇAMENTO — páginas legais com marcador em aberto:** `[E-MAIL DE CONTATO]` (×4), `[RAZÃO SOCIAL OU NOME DO RESPONSÁVEL]`, `[COMARCA]`, `[DATA DE PUBLICAÇÃO]` (×2). Sem um e-mail que receba de verdade, não há LGPD cumprida.
4. **Frontmatter continua inconsistente.** O leitor normaliza, então não quebra — mas padronizar é a limpeza de raiz que evita a próxima surpresa.

---

## 5b. Quarentena — 19 artigos fora do build

Estes artigos existem no repositório como `artigo.md.quarentena` e **não entram no build**. Nenhum foi perdido: renomear de volta para `artigo.md` os traz de volta.

O motivo é um só: **estatística atribuída a instituição real sem fonte conferível.** Os padrões encontrados foram "340%" (o mesmo número-template que já tinha sido removido cinco vezes do acervo), um estudo "Ibope em parceria com a FGV" que não localizamos em lugar nenhum, e "Nielsen Consumer 2026".

```
carreira-proposito-mulheres-brasil-2026   moda-consciente-2026-hype-brasil
cellness-2026-bem-estar-celular           moda-consciente-sustentavel-2026
girl-math-feminino-2026                   prevencao-saude-mental-2026
hype-beleza-inclusiva-2026                prevencao-saude-mental-hype-2026
hype-maquiagem-soft-glam-2026             renda-extra-feminina-brasil-2026
journaling-terapeutico-hype-2026          resiliancia-feminina-hype-2026
manicure-3d-arte-escultural-2026          rotina-autocuidado-hype-2026
maternidade-real-autocuidado-2026         saude-hormonal-natural-2026
mental-health-digital-2026                slow-living-brasil-2026
                                          soft-life-brasil-2026-tendencia
```

**Para tirar um da quarentena:** apague ou substitua a estatística sem fonte — se o dado não puder ser conferido na origem, a frase vai sem o número —, renomeie o arquivo para `artigo.md`, rode o validador e regere o índice.

**Outros 15 artigos com o mesmo problema já estavam no ar** e ficaram, porque removê-los pioraria a cobertura sem melhorar a honestidade. Eles precisam da mesma limpeza:

```
banho-premium-ritual-2026            moda-consciente-2026-tendencias
carreira-com-propouso-alinhar-...    moda-tendencias-2026
casamento-com-proposito-planej...    rotina-fitness-iniciantes-2026
casamentos-proposito-2026            saude-mental-trabalho-2026
decoracao-sustentavel-2026           skinimalismo-2026
financas-2026                        slow-aging-brasil-2026
hype-mulher-resiliencia-2026         terapias-integrativas-brasil-2026
moda-consciente-2026
```

---

## 6. Documentos da raiz que estão velhos

Estes 14 arquivos são de **05/09/2026 ou antes** e descrevem um site que não existe mais (falam em 68 artigos, navegação morta, 60 páginas vazias — tudo resolvido). **Não os use como fonte:**

`STATUS_FINAL.md`, `STATUS-DEPLOY.md`, `ORGANIZACAO-FINAL.md`, `ESTRUTURA-COMPLETA.md`, `VERIFICAR-FINAL.md`, `REFAZER-PASSO-A-PASSO.md`, `NEXUS-AGENT-REPORT.md`, `CONTENT-EVOLVER-AGENT.md`, `DESIGN-INTELLIGENCE-STACK.md`, `DEPLOY-GUIDE.md`, `DEPLOY-INSTRUCTIONS.md`, `HIGGSFIELD-IMAGE-CONFIG.md`, `REFERENCIAS.md`, `nexury-agents-docs.md`.

Os 12 `create_images_*.py` da raiz são scripts de geração de imagem de rodadas antigas, feitos um por assunto. As imagens atuais não vieram deles.

**Este `AGENTS.md` é o documento corrente.** Se ele divergir de qualquer arquivo acima, ele ganha. Se você mudar algo estrutural, atualize-o na mesma tarefa.

---

## 7. O "porquê" mora fora do repositório

As decisões de negócio, personas, estratégia e o histórico das escolhas editoriais estão no vault Obsidian do Fellipe, em:

```
C:\Nexury AI\nexury\Nexury 1\├── 05 - Projetos\Bem Mais Bella\
```

Comece por `Site Bem Mais Bella v2 — Stack, Deploy e Estado do Código.md` (estado técnico) e por `Estrutura do Site, ICP e Personas (Bem Mais Bella).md` (para quem se escreve). As duas notas `Proposta …` registram o que foi proposto para o futuro, o que já virou código e **o que foi deliberadamente deixado de fora, com o motivo**.

Se você fizer algo relevante aqui, **espelhe no vault** — é lá que o Fellipe procura depois.
