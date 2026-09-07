/**
 * A camada de oferta.
 *
 * O plano do projeto e que o conteudo traga audiencia e que parte dessa
 * audiencia vire cliente — de produto proprio, de achadinho, de ferramenta. O
 * que costuma matar isso na pratica nao e falta de produto: e o produto chegar
 * depois, e alguem ter que sair colando link no fim de 142 artigos.
 *
 * Entao o encanamento vem primeiro. Este arquivo e a unica lista de ofertas do
 * site. Quem quiser oferecer algo em qualquer artigo, categoria ou pagina de
 * compras adiciona um item aqui e diz em quais areas ele faz sentido. Nada
 * mais precisa ser tocado.
 *
 * Enquanto nao existir produto de verdade, `OFERTAS` so tem o que ja existe e
 * e honesto oferecer: uma ferramenta que funciona e a newsletter. Nao ha
 * produto inventado aqui, e nao deve haver — colocar um placeholder de produto
 * numa pagina publicada e propaganda de algo que nao existe.
 */

export type TipoOferta =
  | 'ferramenta'  // algo do proprio site que resolve na hora
  | 'newsletter'  // vira contato, nao venda
  | 'produto'     // produto proprio do Bem Mais Bella
  | 'achadinho';  // indicacao de terceiro, quase sempre com afiliado

export type Oferta = {
  id: string;
  tipo: TipoOferta;
  chapeu: string;
  nome: string;
  resumo: string;
  /** Texto do botao. Diz o que acontece ao clicar, nao "clique aqui". */
  acao: string;
  url: string;
  /** Areas em que faz sentido. Vazio = serve para qualquer artigo. */
  areas?: string[];
  /** Preco em reais. Ausente = gratuito ou sem preco fixo. */
  preco?: number;
  /**
   * Link de afiliado ou parceria paga. Quando verdadeiro, a pagina AVISA a
   * leitora — a promessa de transparencia da Sobre Nos depende disso, e por
   * isso o aviso e automatico, nao depende de alguem lembrar.
   */
  afiliado?: boolean;
  /** Prioridade quando mais de uma oferta serve. Maior ganha. */
  peso: number;
};

export const OFERTAS: Oferta[] = [
  {
    id: 'diagnostico',
    tipo: 'ferramenta',
    chapeu: 'Ferramenta gratuita',
    nome: 'Descubra o seu próximo passo',
    resumo:
      'Seis perguntas sobre o seu tempo, o seu dinheiro e o que você já sabe fazer. No fim, um plano na ordem certa — e o que não fazer ainda.',
    acao: 'Fazer o diagnóstico',
    url: '/ferramentas/diagnostico',
    areas: ['carreira-e-financas', 'desenvolvimento-pessoal', 'historias-inspiradoras'],
    peso: 90,
  },
  {
    id: 'em-alta',
    tipo: 'ferramenta',
    chapeu: 'Continue por aqui',
    nome: 'O que está em movimento agora',
    resumo:
      'O que acabou de sair, os assuntos que o acervo mais cobre e por onde você mesma estava passando.',
    acao: 'Ver o que está em alta',
    url: '/em-alta',
    areas: ['famosos-e-entretenimento', 'estilo-e-beleza', 'estilo-de-vida'],
    peso: 60,
  },
  {
    id: 'newsletter',
    tipo: 'newsletter',
    chapeu: 'Sem spam, sem cobrança',
    nome: 'Receba o que sai de novo',
    resumo:
      'Os textos da semana no seu e-mail, escritos pela Lillith. Você sai quando quiser, em um clique.',
    acao: 'Quero receber',
    url: '/newsletter',
    peso: 30,
  },
];

/** As ofertas que se pode comprar. Hoje, nenhuma — e a pagina diz isso. */
export function ofertasComerciais(): Oferta[] {
  return OFERTAS.filter(o => o.tipo === 'produto' || o.tipo === 'achadinho');
}

/**
 * A melhor oferta para uma area.
 *
 * Especifica ganha de generica: uma oferta que cita a area vale mais que uma
 * que serve para tudo, mesmo com peso menor.
 */
export function ofertaPara(areaSlug: string): Oferta | null {
  const candidatas = OFERTAS.filter(o => !o.areas || o.areas.includes(areaSlug));
  if (!candidatas.length) return null;
  return candidatas.sort((a, b) => {
    const especificaA = a.areas ? 1 : 0;
    const especificaB = b.areas ? 1 : 0;
    if (especificaA !== especificaB) return especificaB - especificaA;
    return b.peso - a.peso;
  })[0];
}
