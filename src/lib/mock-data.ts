// === SISTEMA DE CONTEÚDO BEM MAIS BELLA ===
// Estrutura baseada em 9 categorias principais
// Cada categoria com subcategorias, tópicos e artigos

export type Artigo = {
  slug: string;
  title: string;
  metaDescription: string;
  palavraChave: string;
  categoria: string;
  subcategoria: string;
  topico: string;
  descricao: string;
  conteudo: string;
  data: string;
  autor: string;
  urlSite: string;
  urlFacebook: string;
  urlInstagram: string;
  urlTikTok: string;
  urlPinterest: string;
  status: 'Publicado' | 'Rascunho' | 'Pendente';
  views: number;
  compartilhamentos: number;
};

// === CATEGORIA 1: ESTILO E BELEZA ===
// Subcategoria: Moda
export const artigosModa = [
  {
    slug: "tendencias-moda-feminina-2026",
    title: "Tendências de Moda Feminina no Brasil 2026: Guia Completo",
    metaDescription: "Descubra as principais tendências de moda feminina no Brasil para 2026. Cores, tecidos, cortes, moda consciente e tudo o que vai bombar.",
    palavraChave: "tendencias moda feminina brasil 2026",
    categoria: "Estilo e Beleza",
    subcategoria: "Moda",
    topico: "Tendências da Estação",
    descricao: "Vogue Brasil e Harper's Bazaar antecipam: quiet luxury, sofisticação silenciosa, cores terrosas e sustentabilidade dominam 2026.",
    conteudo: `# Tendências de Moda Feminina 2026

A moda brasileira em 2026 é marcada por **sofisticação silenciosa** (quiet luxury), **moda consciente** e **cores terrosas**. Veja o que vai usar nesta estação:

## Cores em Alta
- **Bege areia** e tons de areia do deserto
- **Verde musgo** e tons de floresta
- **Marrom chocolate** em diferentes intensidades
- **Azul serenity** para peças atemporais
- **Burgundy** para pontos de cor marcantes

## Tecidos Nobres
- Linho misto (perfeito para o clima tropical)
- Algodão orgânico certificado
- Seda brasileira
- Tricot artesanal

## Cortes e Modelagens
- **Guarda-roupa cápsula** — menos peças, mais qualidade
- **Linhas retas** e alfaiataria desconstruída
- **Saias midi** em alta
- **Calça wide leg** como peça-chave
- **Blazer oversized** em todas as coleções

## Moda Consciente
- Upcycling e brechós de luxo
- Marcas brasileiras sustentáveis
- Slow fashion
- Roupas duráveis em vez de tendências passageiras

## Looks para Cada Ocasião
- **Trabalho**: alfaiataria em tons neutros
- **Celebração**: brilho discreto e texturas nobres
- **Dia a dia**: looks atemporais e versáteis

## Tendências por Estação
- **Outono/Inverno 2026**: tons terrosos, sobreposições, tricots
- **Primavera/Verão 2026**: cores vibrantes, tecidos leves, fluidez

> **Dica Lillith**: invista em peças-chave de qualidade — um blazer bem cortado, uma calça wide leg perfeita, uma bolsa estruturada. Essas peças atravessam estações e tendências.

## Marcas Brasileiras em Destaque
- **Farm Rio**: estampas exclusivas e cores vibrantes
- **Animale**: elegância contemporânea
- **Lenny Niemeyer**: beachwear sofisticado
- **Alexandre Herchcovitch**: vanguarda brasileira
- **Reinaldo Lourenço**: minimalismo autoral

## Acessórios do Momento
- Bolsas estruturadas em couro
- Sapatilhas kitten heel
- Cintos marcados
- Lenços de seda
- Joias delicadas em ouro

### Como Aplicar Essas Tendências
1. **Comece pelo básico** — invista em peças atemporais
2. **Adicione uma tendência** por look
3. **Adapte ao seu estilo pessoal** — não vista tendência, vista você
4. **Considere seu corpo** — nem toda tendência serve para todo corpo, e tudo bem
5. **Priorize qualidade** — uma peça boa dura anos

### FAQ
**O que vai ser moda em 2026?**
Quiet luxury, moda consciente, guarda-roupa cápsula, cores terrosas, alfaiataria desconstruída.

**Quais são as cores do verão 2026 no Brasil?**
Verde musgo, azul serenity, bege areia, coral e lilás.

**Como montar um guarda-roupa cápsula?**
Comece com 30-40 peças versáteis em cores neutras e adicione 5-10 peças statement por estação.

**Onde comprar moda consciente no Brasil?**
Farm, Insecta Shoes, Oficina Ethos, Sintropia, Baw Clothing.

---

*Por Lillith Nogah — Bem Mais Bella*`,
    data: "2026-08-01",
    autor: "Lillith Nogah",
    urlSite: "https://bemmaisbella.com.br/estilo-e-beleza/moda/tendencias-2026",
    urlFacebook: "https://facebook.com/bemmaisbella/posts/tendencias-moda-2026",
    urlInstagram: "https://instagram.com/p/tendencias-moda-2026/",
    urlTikTok: "https://tiktok.com/@bemmaisbella/video/tendencias-moda-2026",
    urlPinterest: "https://pinterest.com/pin/tendencias-moda-2026",
    status: "Publicado" as const,
    views: 0,
    compartilhamentos: 0,
  },
  // Mais artigos em breve...
];

// === CATEGORIA 2: SAÚDE E BEM-ESTAR ===
export const artigosSaude = [
  {
    slug: "saude-feminina-2026-cuidados-essenciais",
    title: "Saúde Feminina em 2026: 10 Cuidados Essenciais para o Ano",
    metaDescription: "Os 10 cuidados essenciais para a saúde da mulher em 2026. Prevenção, nutrição, saúde mental, exames de rotina e bem-estar integral.",
    palavraChave: "saude feminina 2026 cuidados essenciais",
    categoria: "Saúde e Bem-Estar",
    subcategoria: "Saúde",
    topico: "Prevenção e Cuidados Femininos",
    descricao: "Carta Capital destaca os pilares da saúde feminina em 2026: prevenção, equilíbrio hormonal, saúde mental e autocuidado diário.",
    conteudo: `# Saúde Feminina em 2026: 10 Cuidados Essenciais

A saúde da mulher é **integral** — corpo, mente e espírito. Em 2026, os cuidados se organizam em 10 pilares fundamentais:

## 1. Exames de Rotina
- **Papanicolau** anual (a partir dos 25 anos)
- **Mamografia** anual (a partir dos 40, ou 35 com histórico familiar)
- **Hemograma completo** + **TSH** + **ferritina**
- **Colesterol** + **glicemia**
- **Ultrassom transvaginal** quando indicado

## 2. Saúde Hormonal
- Acompanhamento com **ginecologista** e **endocrinologista**
- Avaliação de **TPM intensa** (não é normal)
- Atenção a **endometriose** e **SOP**
- **Terapia hormonal** quando necessário (menopausa)

## 3. Nutrição Equilibrada
- **Proteínas** em todas as refeições
- **Gorduras boas** (abacate, castanhas, azeite)
- **Ferro** — especialmente para mulheres com ciclo menstrual intenso
- **Vitamina D** — deficiência comum no Brasil
- **Ômega 3** — saúde cardiovascular e cerebral

## 4. Atividade Física
- **150 minutos** de atividade moderada por semana
- Combinar **musculação** + **cardio** + **flexibilidade**
- **Pilates** e **yoga** para saúde do assoalho pélvico
- Caminhada diária (mesmo que 20 min)

## 5. Saúde Mental
- **Terapia** não é luxo, é necessidade
- Atenção a **ansiedade** e **depressão** (mais comuns em mulheres)
- **Burnout** feminino — reconhecer sinais
- Espaços de **autocuidado mental**

## 6. Sono de Qualidade
- **7-9 horas** por noite
- Rotina de **higiene do sono**
- Reduzir telas antes de dormir
- Quarto escuro, fresco e silencioso

## 7. Hidratação
- **2-3 litros** de água por dia
- Mais em dias quentes ou atividade física
- Chás e frutas hidratantes

## 8. Saúde Sexual
- **Consultas regulares** com ginecologista
- **Prevenção** de ISTs
- **Consentimento** e **prazer** fazem parte da saúde
- **Libido** pode ser tratada — converse com seu médico

## 9. Prevenção do Câncer
- **Autoexame** das mamas mensal
- **Exames preventivos** em dia
- Atenção a **histórico familiar**
- Estilo de vida saudável reduz riscos

## 10. Autocuidado Integral
- **Momentos para você** — sem culpa
- **Conexões** saudáveis
- **Propósito** e **significado**
- **Espiritualidade** (para quem busca)

> **Lembre-se**: você não precisa ser perfeita. Saúde é jornada, não destino.

### Recursos e Profissionais
- **Apps de saúde**: Clue (ciclo), MyFitnessPal (nutrição), Calm (meditação)
- **Profissionais**: ginecologista, endocrinologista, nutricionista, psicólogo, educador físico
- **Telemedicina**: facilita o acesso a consultas

### FAQ
**Quais exames uma mulher deve fazer por ano?**
Papanicolau, mamografia (a partir dos 40), hemograma, TSH, glicemia, colesterol.

**Como aliviar TPM intensa?**
Alimentação anti-inflamatória, atividade física, magnésio, chás, acompanhamento médico.

**Quando começar a fazer mamografia?**
Aos 40 anos, ou aos 35 com histórico familiar.`,
    data: "2026-08-02",
    autor: "Lillith Nogah",
    urlSite: "https://bemmaisbella.com.br/saude-e-bem-estar/saude/cuidados-2026",
    urlFacebook: "https://facebook.com/bemmaisbella/posts/saude-2026",
    urlInstagram: "https://instagram.com/p/saude-2026/",
    urlTikTok: "https://tiktok.com/@bemmaisbella/video/saude-2026",
    urlPinterest: "https://pinterest.com/pin/saude-2026",
    status: "Publicado" as const,
    views: 0,
    compartilhamentos: 0,
  },
];

// === CATEGORIA 3: MATERNIDADE E FAMÍLIA ===
export const artigosMaternidade = [
  {
    slug: "cartilha-pos-parto-usp-2026",
    title: "Cartilha de Planejamento do Pós-Parto: Guia Completo USP",
    metaDescription: "A primeira cartilha brasileira de planejamento do pós-parto da USP. Recuperação, vínculo, amamentação e bem-estar materno.",
    palavraChave: "cartilha pos parto usp 2026",
    categoria: "Maternidade e Família",
    subcategoria: "Maternidade",
    topico: "Pós-Parto",
    descricao: "Pesquisadoras da USP lançam a primeira cartilha brasileira para orientar gestantes sobre o pós-parto — recuperação, vínculo, amamentação, autoestima.",
    conteudo: `# Cartilha de Pós-Parto USP: O Que Toda Mãe Precisa Saber

A **primeira cartilha brasileira de planejamento do pós-parto**, criada por pesquisadoras da USP, é um marco para a maternidade no Brasil. Veja os pontos principais:

## Por Que Essa Cartilha é Importante?
- **Falta de informação** sobre o pós-parto no Brasil
- **Puerpério** é pouco discutido, mas afeta 100% das mães
- **Saúde mental materna** negligenciada
- **Recuperação física** mal orientada

## O Que a Cartilha Aborda?

### 1. Recuperação Física
- **Sínfise púbica** e dores pélvicas
- **Cicatrização** (parto normal ou cesárea)
- **Incontinência urinária** — comum e tratável
- **Diástase abdominal** — como tratar
- **Dores nas costas** e ajustes posturais

### 2. Saúde Mental
- **Baby blues** vs **depressão pós-parto**
- Sinais de alerta que exigem atenção
- **Rede de apoio** — fundamental
- Quando buscar **ajuda profissional**

### 3. Amamentação
- **Pega correta** do bebê
- **Fissuras** e como evitar
- **Bancos de leite** no Brasil
- **Ordenha** e armazenamento
- Amamentar e trabalhar — seus direitos

### 4. Vínculo com o Bebê
- **Apego seguro** desde os primeiros dias
- **Contato pele a pele**
- **Choro** do bebê — o que significa
- **Rotina** do recém-nascido

### 5. Vida Sexual no Pós-Parto
- Quando **retomar** a atividade sexual
- **Lubrificação** e desconforto
- **Contracepção** no pós-parto
- **Comunicação** com o parceiro

### 6. Autoestima e Identidade
- **Mãe antes de tudo** — e o eu mulher?
- **Mudanças corporais** — acolhimento
- **Tempo para si** sem culpa
- **Maternidade real** vs redes sociais

## Acompanhamento Profissional
- **Pediatra** — consultas regulares do bebê
- **Ginecologista** — revisão pós-parto
- **Psicólogo** — saúde mental
- **Fisioterapeuta pélvico** — recuperação
- **Nutricionista** — alimentação e aleitamento

> **Frase da cartilha**: "Mãe feliz, bebê feliz. Cuidar de você é cuidar do seu filho."

### Onde Baixar a Cartilha
A cartilha está disponível gratuitamente no site da **USP** e em **unidades básicas de saúde** de todo o Brasil.

### FAQ
**Quando a mulher deve ir ao ginecologista após o parto?**
Entre 6 e 8 semanas após o parto (ou antes se houver complicações).

**O que é baby blues?**
Tristeza e ansiedade nos primeiros dias após o parto — normal e passageiro (até 2 semanas). Se durar mais, pode ser depressão pós-parto.

**Como saber se tenho depressão pós-parto?**
Tristeza profunda, desespero, falta de vínculo com o bebê, pensamentos negativos. Procure ajuda imediatamente.`,
    data: "2026-08-03",
    autor: "Lillith Nogah",
    urlSite: "https://bemmaisbella.com.br/maternidade-e-familia/pos-parto/cartilha-usp",
    urlFacebook: "https://facebook.com/bemmaisbella/posts/cartilha-usp",
    urlInstagram: "https://instagram.com/p/cartilhausp/",
    urlTikTok: "https://tiktok.com/@bemmaisbella/video/cartilhausp",
    urlPinterest: "https://pinterest.com/pin/cartilhausp",
    status: "Publicado" as const,
    views: 0,
    compartilhamentos: 0,
  },
];

// === CATEGORIA 4: CARREIRA E FINANÇAS ===
export const artigosCarreira = [
  {
    slug: "rede-mulher-empreendedora-2026",
    title: "Rede Mulher Empreendedora: Como Crescer Seu Negócio em 2026",
    metaDescription: "Rede Mulher Empreendedora e Núcleo Estratégico de Empreendedorismo Feminino. Como crescer, investir e liderar em 2026.",
    palavraChave: "rede mulher empreendedora 2026",
    categoria: "Carreira e Finanças",
    subcategoria: "Carreira com Propósito",
    topico: "Empreendedorismo com Alma",
    descricao: "Como a Rede Mulher Empreendedora e o Núcleo Estratégico de Empreendedorismo Feminino estão transformando o cenário brasileiro em 2026.",
    conteudo: `# Rede Mulher Empreendedora: Seu Guia 2026

A **Rede Mulher Empreendedora (RME)** é a maior rede de empreendedorismo feminino do Brasil. Em 2026, junto com o **Núcleo Estratégico de Empreendedorismo Feminino**, oferece ferramentas, conexões e capacitação para mulheres que querem crescer.

## Por Que o Empreendedorismo Feminino é Diferente?

### Desafios Específicos
- **Capital inicial** — menor acesso a crédito
- **Rede de contatos** — em construção
- **Jornada dupla** — trabalho + casa
- **Síndrome da impostora** — mais comum em mulheres
- **Mercado** — alguns nichos ainda são masculinos

### Forças da Mulher Empreendedora
- **Empatia** e **inteligência emocional**
- **Multitarefa** natural
- **Resiliência**
- **Capacidade de adaptação**
- **Visão de comunidade**

## Setores em Alta para 2026

### 1. Beleza e Bem-Estar
- Salões de beleza
- Estética avançada
- Wellness corporativo
- Produtos naturais

### 2. Tecnologia
- Desenvolvimento de software
- Marketing digital
- E-commerce
- SaaS

### 3. Saúde
- Telemedicina
- Psicologia online
- Nutrição funcional
- Fisioterapia

### 4. Educação
- Cursos online
- Mentoria
- Coaching
- Consultoria

### 5. Serviços
- Assessoria de comunicação
- Consultoria financeira
- Organização pessoal
- Eventos

## Como Crescer Seu Negócio em 2026

### Estratégia 1: Marketing Digital
- **Instagram** e **TikTok** para visibilidade
- **Conteúdo de valor** — educa e vende
- **E-mail marketing** para fidelização
- **Anúncios pagos** para escala

### Estratégia 2: Networking
- **Grupos de mulheres** empreendedoras
- **Eventos** e **mentorias**
- **Parcerias estratégicas**
- **Comunidades online**

### Estratégia 3: Educação Financeira
- **Separar** contas pessoais e empresa
- **Reserva de emergência** (6-12 meses)
- **Investir** o lucro, não só gastar
- **CNPJ** adequado ao seu negócio

### Estratégia 4: Posicionamento
- **Especialização** em vez de generalismo
- **Autoridade** no seu nicho
- **Conteúdo consistente**
- **Presença digital** forte

## Onde Buscar Apoio

### Redes e Associações
- **RME** (Rede Mulher Empreendedora)
- **Sebrae Delas**
- **Women in Tech**
- **Instituto Mulheres do Varejo**
- **Núcleo Estratégico de Empreendedorismo Feminino** (Gov.br)

### Linhas de Crédito
- **Banco do Povo** (microcrédito)
- **BNDES** — linhas especiais para mulheres
- **Sebrae** — capital semente
- **Programas estaduais** e municipais

### Mentoria
- **Mulheres do Brasil** (mentoria)
- **Flor de Referência**
- **Ashoka** (empreendedoras sociais)
- Programas universitários

## Casos de Sucesso

- **Lilian Pacce** — moda e lifestyle
- **Silvia Lemos** — varejo
- **Luiza Trajano** — Magazine Luiza
- **Cristina Junqueira** — Nubank

> **Frase inspiradora**: "O maior risco é não arriscar." — Sophia Amoruso

### FAQ
**Como começar a empreender com pouco dinheiro?**
Comece com serviços (não exige estoque), use redes sociais para divulgar, busque microcrédito, e reinvista os primeiros lucros.

**Quanto tempo leva para um negócio dar lucro?**
Em média 6-12 meses para serviços, 12-24 meses para produtos. Mas cada negócio é único.

**Como equilibrar maternidade e empreendedorismo?**
Organize sua rotina, tenha rede de apoio, defina horários, e não tenha medo de pedir ajuda.`,
    data: "2026-08-04",
    autor: "Lillith Nogah",
    urlSite: "https://bemmaisbella.com.br/carreira-e-financas/empreendedorismo/2026",
    urlFacebook: "https://facebook.com/bemmaisbella/posts/empreendedorismo2026",
    urlInstagram: "https://instagram.com/p/emp2026/",
    urlTikTok: "https://tiktok.com/@bemmaisbella/video/emp2026",
    urlPinterest: "https://pinterest.com/pin/emp2026",
    status: "Publicado" as const,
    views: 0,
    compartilhamentos: 0,
  },
];

// === CATEGORIA 5: HISTÓRIAS INSPIRADORAS ===
export const artigosInspiracao = [
  {
    slug: "leis-protecao-mulheres-lula-2026",
    title: "Lula Sanciona Três Leis que Ampliam Proteção às Mulheres",
    metaDescription: "Três novas leis ampliam proteção às mulheres no Brasil em 2026. Conheça seus direitos e o que mudou.",
    palavraChave: "leis protecao mulheres brasil 2026",
    categoria: "Histórias Inspiradoras",
    subcategoria: "Relatos",
    topico: "Superação e Transformação",
    descricao: "Em 2026, o presidente Lula sancionou três leis históricas que ampliam a proteção e os direitos das mulheres brasileiras.",
    conteudo: `# Três Leis Históricas para as Mulheres em 2026

O presidente Lula sancionou em 2026 três leis que representam um **avanço histórico** nos direitos das mulheres brasileiras. Conheça cada uma:

## Lei 1: Proteção contra Violência Política de Gênero
- **Criminaliza** assédio, ameaças e agressões contra mulheres em espaços de poder
- **Aumenta penas** para crimes políticos motivados por gênero
- **Cria canais** de denúncia específicos
- **Reserva vagas** em conselhos e comitês

### O que muda na prática?
- **Mulheres políticas** terão mais segurança
- **Candidatas** estarão mais protegidas
- **Assédio virtual** será combatido
- **Representatividade** feminina crescerá

## Lei 2: Licença-Maternidade Estendida para Adotantes
- **Licença de 180 dias** para mães adotantes
- **Inclui pais** em todos os formatos de família
- **Reconhece** famílias diversas (monoparentais, homoafetivas, adotivas)
- **Amplia** o conceito de maternidade

### Por que é importante?
- **Vínculo** com o filho adotivo é fundamental
- **Igualdade** com mães biológicas
- **Inclusão** de famílias diversas
- **Apoio** à primeira infância

## Lei 3: Igualdade Salarial e Transparência
- **Empresas** devem publicar relatórios salariais
- **Multas** para quem descumprir
- **Auditoria** anual obrigatória
- **Plano de equidade** exigido para grandes empresas

### Impacto esperado
- **Redução** da diferença salarial (atualmente 20% menor)
- **Transparência** nos processos seletivos
- **Promoção** de mulheres a cargos de liderança
- **Cultura** de equidade nas empresas

## O Que Essas Leis Significam?

### Para Mulheres Negras
- **Interseccionalidade** reconhecida
- **Ações afirmativas** ampliadas
- **Combate** ao racismo estrutural

### Para Mulheres do Campo
- **Proteção** em casos de violência
- **Acesso** a programas de desenvolvimento
- **Reconhecimento** do trabalho rural

### Para Mulheres com Deficiência
- **Inclusão** em programas de proteção
- **Acessibilidade** nos serviços
- **Direitos** específicos garantidos

## Como Acompanhar as Mudanças
- **Site** do Planalto: planalto.gov.br
- **Imprensa Nacional**: para textos completos das leis
- **Defensoria Pública** para orientação gratuita
- **Organizações de mulheres** para apoio

## Próximas Lutas

- **Representatividade** nos espaços de decisão
- **Saúde** integral da mulher
- **Educação** sem estereótipos de gênero
- **Justiça** para vítimas de violência
- **Igualdade** em todas as esferas

> **Frase inspiradora**: "Quando as mulheres avançam, a humanidade avança." — Barack Obama

### Movimentos e ONGs
- **Instituto Maria da Penha**
- **Observatório da Mulher contra a Violência**
- **Cebrap** (Centro Brasileiro de Análise e Planejamento)
- **Geledes** (mulheres negras)
- **Movimento Mulheres Negras Decidem**

### FAQ
**O que é violência política de gênero?**
Qualquer ação que vise impedir ou dificultar o exercício de cargo político por mulheres, incluindo assédio, ameaças e agressões.

**Como denunciar violência contra a mulher?**
Ligue 180 (Central de Atendimento à Mulher), procure a delegacia especializada mais próxima, ou use o app **PenhaS**.`,
    data: "2026-08-05",
    autor: "Lillith Nogah",
    urlSite: "https://bemmaisbella.com.br/historias-inspiradoras/leis-protecao-2026",
    urlFacebook: "https://facebook.com/bemmaisbella/posts/leis-2026",
    urlInstagram: "https://instagram.com/p/leis2026/",
    urlTikTok: "https://tiktok.com/@bemmaisbella/video/leis2026",
    urlPinterest: "https://pinterest.com/pin/leis2026",
    status: "Publicado" as const,
    views: 0,
    compartilhamentos: 0,
  },
];

// === EXPORTAÇÃO PRINCIPAL ===
export const NOTICIAS_MOCK = [
  ...artigosModa,
  ...artigosSaude,
  ...artigosMaternidade,
  ...artigosCarreira,
  ...artigosInspiracao,
];

export const artigosPublicados = NOTICIAS_MOCK.filter(n => n.status === "Publicado");
export const artigosRascunho = NOTICIAS_MOCK.filter(n => n.status === "Rascunho");

// Para evitar duplicação - todos os slugs são únicos
export const slugsPublicados = artigosPublicados.map(a => a.slug);

// --- REDE SOCIAL TIKTOK ---
export const tiktokLinks = {
  "@webloved": "https://vt.tiktok.com/ZSq1nvA1U/",
  "@whitewhoadie": "https://vt.tiktok.com/ZSq1noYyn/"
};

export const instagramLinks = {
  "@bemmaisbella": "https://instagram.com/bemmaisbella"
};

export const facebookLinks = {
  "Bem Mais Bella": "https://facebook.com/bemmaisbella"
};

// --- NOVO TIKTOK ---
export const tiktokLinksNovos = {
  "@hyliox.io": "https://vt.tiktok.com/ZSq1W9BXP/"
};
