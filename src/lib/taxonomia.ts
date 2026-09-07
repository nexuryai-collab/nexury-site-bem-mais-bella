/**
 * A arvore do Bem Mais Bella, em um lugar so.
 *
 * Antes desta lista, a estrutura do site vivia repetida em quatro lugares: o
 * menu do topo, o rodape, o `CATEGORIAS` do leitor e as pastas de rota. Trocar
 * uma categoria de nome significava lembrar dos quatro. Agora menu, rodape,
 * paginas e o proprio leitor leem daqui.
 *
 * Duas ideias que a arquitetura nova (setembro/2026) trouxe e que estao
 * codificadas neste arquivo:
 *
 * 1. **Nem toda area e uma categoria de artigo.** Existe area editorial (tem
 *    acervo), transversal (corta o acervo de lado, como "Em Alta"), ferramenta
 *    (termina em decisao, nao em texto), comercial e institucional. Elas se
 *    comportam de forma diferente no menu e no sitemap, e por isso carregam um
 *    `tipo`.
 *
 * 2. **Area preparada nao e area publicada.** Uma area editorial sem nenhum
 *    artigo tem rota, tem lugar na arvore e tem pagina que se explica — mas nao
 *    entra no menu, porque link para pagina vazia e pior do que nao ter link.
 *    Quem decide isso e o acervo, em `areasVisiveis()`, nao uma flag escrita a
 *    mao que alguem esquece de virar.
 */

export type TipoArea =
  | 'editorial'      // tem acervo proprio de artigos
  | 'transversal'    // atravessa o acervo inteiro
  | 'ferramenta'     // termina em decisao
  | 'comercial'      // recomendacao de produto
  | 'comunidade'     // participacao da leitora
  | 'institucional'; // quem somos, regras, contato

export type Area = {
  slug: string;
  nome: string;
  /** Rotulo curto para o menu do topo, onde espaco e caro. */
  curto?: string;
  tipo: TipoArea;
  /** Niveis 2 da arvore. Aparecem como secoes ancoradas dentro da pagina. */
  sub: string[];
  /** O arquetipo com que a Lillith escreve nesta area. */
  voz?: string;
  slogan?: string;
  /** Uma frase para a pagina quando ainda nao ha materia publicada. */
  vazia?: string;
  /** Regra editorial propria, quando a area exige uma. */
  regra?: string;
};

/* ------------------------------------------------------------------ */
/* Areas editoriais — as que tem acervo                                */
/* ------------------------------------------------------------------ */

export const EDITORIAIS: Area[] = [
  {
    slug: 'estilo-e-beleza',
    nome: 'Estilo e Beleza',
    tipo: 'editorial',
    sub: ['Moda', 'Beleza'],
    voz: 'A Confidente Estilosa',
    slogan: 'Vista sua essência. Viva sua beleza.',
  },
  {
    slug: 'saude-e-bem-estar',
    nome: 'Saúde e Bem-Estar',
    curto: 'Saúde',
    tipo: 'editorial',
    sub: ['Saude', 'Bem-Estar'],
    voz: 'A Guardiã do Cuidado',
    slogan: 'Seu corpo fala. Sua alma responde.',
    regra:
      'Conteúdo de saúde informa, não prescreve. Nenhum texto desta área substitui consulta, exame ou orientação de profissional.',
  },
  {
    slug: 'maternidade-e-familia',
    nome: 'Maternidade e Família',
    curto: 'Maternidade',
    tipo: 'editorial',
    sub: ['Maternidade', 'Familia'],
    voz: 'A Mãe Sábia',
    slogan: 'Criar filhos é criar o futuro com amor.',
  },
  {
    slug: 'casamentos-com-proposito',
    nome: 'Casamentos com Propósito',
    curto: 'Casamentos',
    tipo: 'editorial',
    sub: ['Planejamento', 'Praticidade', 'Essencia'],
    voz: 'A Conselheira do Amor',
    slogan: 'O amor começa em você.',
  },
  {
    slug: 'relacionamentos-conscientes',
    nome: 'Relacionamentos Conscientes',
    curto: 'Relacionamentos',
    tipo: 'editorial',
    sub: ['Conexao', 'Crescimento', 'Amor em Acao'],
    voz: 'A Conselheira do Amor',
    slogan: 'O amor que evolui começa em você.',
  },
  {
    slug: 'carreira-e-financas',
    nome: 'Carreira e Finanças',
    curto: 'Carreira',
    tipo: 'editorial',
    sub: ['Carreira com Proposito', 'Financas Conscientes'],
    voz: 'A Mentora Visionária',
    slogan: 'Liberdade financeira é poder ser quem você é.',
    regra:
      'Conteúdo sobre dinheiro informa, não recomenda investimento. Nenhum texto desta área é consultoria financeira nem promete retorno.',
  },
  {
    slug: 'estilo-de-vida',
    nome: 'Estilo de Vida',
    tipo: 'editorial',
    sub: ['Viagens', 'Decoracao', 'Hobbies', 'Gastronomia'],
    voz: 'A Exploradora Criativa',
    slogan: 'Sua vida, sua arte.',
  },
  {
    slug: 'desenvolvimento-pessoal',
    nome: 'Desenvolvimento Pessoal',
    tipo: 'editorial',
    sub: ['Autoconhecimento', 'Crescimento', 'Bem-Estar', 'Espiritualidade'],
    voz: 'A Alma Desperta',
    slogan: 'Transformar-se é a jornada mais bela que existe.',
  },
  {
    slug: 'historias-inspiradoras',
    nome: 'Histórias Inspiradoras',
    curto: 'Histórias',
    tipo: 'editorial',
    sub: ['Relatos', 'Entrevistas', 'Reflexoes'],
    voz: 'A Guardiã das Memórias',
    slogan: 'Mulheres que brilham porque já foram escuridão.',
  },
  {
    slug: 'famosos-e-entretenimento',
    nome: 'Famosos e Entretenimento',
    curto: 'Famosos',
    tipo: 'editorial',
    sub: [
      'Famosos',
      'TV e Reality',
      'Cultura Pop',
      'Amor dos Famosos',
      'Viral',
    ],
    voz: 'A Observadora Atenta',
    slogan: 'O que acontece com elas, sem inventar o que não aconteceu.',
    vazia:
      'Esta área está estruturada e ainda não tem matéria publicada. Ela abre quando a regra editorial de cobertura de pessoas reais estiver fechada — não antes.',
    regra:
      'Cobertura de pessoa real só a partir de fato atribuível: o que a pessoa publicou, disse em entrevista ou anunciou, sempre com a origem no texto. Rumor, boato e "fontes próximas" não entram. Erro identificado é corrigido no próprio texto, com a correção sinalizada.',
  },
];

/* ------------------------------------------------------------------ */
/* Camadas que nao sao categoria de artigo                             */
/* ------------------------------------------------------------------ */

export const TRANSVERSAIS: Area[] = [
  {
    slug: 'em-alta',
    nome: 'Em Alta Agora',
    curto: 'Em Alta',
    tipo: 'transversal',
    sub: ['Acabou de sair', 'Assuntos que mais aparecem', 'Voce estava lendo'],
  },
  {
    slug: 'ferramentas',
    nome: 'Ferramentas',
    tipo: 'ferramenta',
    sub: ['Diagnostico Empreendedor', 'Quiz de Estilo', 'Busca no acervo'],
  },
  {
    slug: 'para-voce',
    nome: 'Para Você',
    tipo: 'transversal',
    sub: ['Recomendacoes', 'O que voce leu'],
  },
  {
    slug: 'compras',
    nome: 'Compras e Recomendações',
    curto: 'Compras',
    tipo: 'comercial',
    sub: ['Achadinhos', 'Comparativos', 'Reviews'],
    vazia:
      'Esta área está estruturada e ainda não tem recomendação publicada. Ela abre quando existir produto realmente testado para indicar — recomendação sem teste é anúncio disfarçado.',
    regra:
      'Só entra produto que alguém do Bem Mais Bella usou. Link de afiliado é identificado no próprio texto, e a existência de comissão nunca muda a avaliação.',
  },
  {
    slug: 'comunidade',
    nome: 'Comunidade',
    tipo: 'comunidade',
    sub: ['Historias das leitoras', 'Conversa', 'Encontros'],
  },
];

export const INSTITUCIONAIS: Area[] = [
  { slug: 'sobre-nos', nome: 'Sobre Nós', tipo: 'institucional', sub: [] },
  { slug: 'politica-editorial', nome: 'Política Editorial', tipo: 'institucional', sub: [] },
  { slug: 'busca', nome: 'Buscar no acervo', tipo: 'institucional', sub: [] },
  { slug: 'politica-de-privacidade', nome: 'Política de Privacidade', tipo: 'institucional', sub: [] },
  { slug: 'termos-de-uso', nome: 'Termos de Uso', tipo: 'institucional', sub: [] },
];

export const TODAS: Area[] = [...EDITORIAIS, ...TRANSVERSAIS, ...INSTITUCIONAIS];

export function areaDe(slug: string): Area | null {
  return TODAS.find(a => a.slug === slug) || null;
}

/**
 * Quais areas editoriais podem aparecer na navegacao.
 *
 * Recebe a contagem por area em vez de importar o leitor, para nao criar
 * dependencia circular e para o menu (cliente) poder usar a mesma regra que a
 * pagina (servidor).
 */
export function areasVisiveis(totalPorSlug: Record<string, number>): Area[] {
  return EDITORIAIS.filter(a => (totalPorSlug[a.slug] || 0) > 0);
}

/** Areas com rota pronta que ainda nao tem o que mostrar. */
export function areasPreparadas(totalPorSlug: Record<string, number>): Area[] {
  return EDITORIAIS.filter(a => (totalPorSlug[a.slug] || 0) === 0);
}
