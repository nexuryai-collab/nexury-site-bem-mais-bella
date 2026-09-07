import PaginaInstitucional from '@/components/PaginaInstitucional';
import { CATEGORIAS } from '@/lib/artigos';

export const metadata = {
  title: 'Sobre Nós | Bem Mais Bella',
  description:
    'Para quem o Bem Mais Bella escreve, quem é Lillith Nogah e como o conteúdo é produzido.',
};

/**
 * Escrito a partir do briefing editorial do projeto (vault Obsidian,
 * "Estrutura do Site, ICP e Personas").
 *
 * Decisão editorial tomada com o responsável: Lillith Nogah é apresentada como
 * PSEUDÔNIMO, não como personagem de IA nem como jornalista real. Um nome de
 * pena é prática antiga e legítima na imprensa, não exige expor quem escreve, e
 * evita a incoerência de uma página institucional dizer que ninguém real
 * responde pelo site.
 *
 * Os números desta página (quantidade de artigos, extensão) precisam ser
 * conferidos sempre que o acervo mudar. Já estiveram errados uma vez.
 */
export default function Page() {
  return (
    <PaginaInstitucional
      chapeu="Sobre Nós"
      titulo="Sobre Nós"
      resumo="Um veículo sobre a vida da mulher brasileira — feito para ser lido no ritmo de quem tem pouco tempo e muita coisa acontecendo."
      cor="historias-inspiradoras"
    >
      <h2>Para quem a gente escreve</h2>
      <p>
        Para a mulher que trabalha, cuida de alguém, tenta cuidar de si e ainda quer construir
        alguma coisa que seja dela. Ela lê no celular, no intervalo, desconfia de promessa redonda e
        confia em quem fala a partir da experiência.
      </p>
      <p>
        Ela valoriza <strong>sustentabilidade, equilíbrio, autenticidade e independência</strong> — e
        o que ela mais teme não é errar, é se perder de si mesma no meio das contas, do filho e da
        carreira. Todo texto deste site é escrito para ela.
      </p>

      <h2>Nossa Missão</h2>
      <p>
        Falar sem pressa artificial e sem promessa milagrosa. Boa parte do conteúdo sobre beleza,
        saúde e maternidade ou vende urgência, ou vende culpa. A gente prefere um terceiro caminho:
        informação que respeita o tempo, o corpo e o orçamento de quem lê.
      </p>

      <h2>Nossos Valores</h2>
      <ul>
        <li>
          <strong>Nada de promessa que não se sustenta.</strong> Nenhum texto aqui garante resultado
          em prazo determinado.
        </li>
        <li>
          <strong>Corpo real, orçamento real.</strong> Conteúdo para todos os corpos, todas as
          idades e as faixas de renda que existem no Brasil — não para a vitrine.
        </li>
        <li>
          <strong>Conteúdo não substitui profissional.</strong> Sobre saúde, dinheiro e maternidade
          a gente informa; quem decide é você, com quem cuida de você.
        </li>
        <li>
          <strong>Número só com fonte.</strong> Se não dá para verificar, não entra. Preferimos uma
          frase sem estatística a uma estatística sem origem.
        </li>
        <li>
          <strong>Transparência sobre publicidade.</strong> Conteúdo patrocinado ou com link de
          afiliado é identificado no próprio texto.
        </li>
      </ul>

      <h2>Quem é Lillith Nogah</h2>
      <p>
        Lillith Nogah é o nome sob o qual o Bem Mais Bella é escrito. É um{' '}
        <strong>pseudônimo</strong> — uma voz editorial, não uma pessoa com CPF.
      </p>
      <p>
        A escolha foi deliberada. Um veículo que fala de corpo, dinheiro, parto e casamento precisa
        de <em>uma</em> voz reconhecível, que atravesse assuntos muito diferentes sem trocar de
        personalidade a cada texto. Lillith é essa voz.
      </p>
      <p>
        Por trás dela há uma operação enxuta: uma pessoa que pesquisa, escreve, edita e responde
        pelo que é publicado, com apoio de ferramentas de inteligência artificial na pesquisa e na
        produção. A responsabilidade formal pelo site está identificada na{' '}
        <a href="/politica-de-privacidade">Política de Privacidade</a>.
      </p>
      <p>
        A gente prefere dizer isso na primeira página a deixar você descobrir depois. O nome é
        inventado; o cuidado com o que se publica, não.
      </p>

      <h2>As nove vozes</h2>
      <p>
        Cada área do site tem um arquétipo próprio dentro da voz da Lillith. Não é enfeite: é o que
        faz um texto sobre parto humanizado ter tom diferente de um texto sobre investimento.
      </p>
      <ul>
        {CATEGORIAS.map(c => (
          <li key={c.slug}>
            <a href={'/' + c.slug}>
              <strong>{c.nome}</strong>
            </a>{' '}
            — {c.voz}: <em>{c.slogan}</em>
          </li>
        ))}
      </ul>

      <h2>Como o conteúdo é produzido</h2>
      <p>
        O acervo tem hoje mais de 140 artigos distribuídos nas nove áreas acima. Os textos são
        longos de propósito — a maior parte passa de mil palavras, e muitos vão bem além disso —
        porque assunto que importa não cabe em lista de cinco itens.
      </p>
      <p>
        O processo é simples e vale ser dito em voz alta. A pauta nasce do que a leitora pergunta e
        do que falta de conteúdo honesto sobre o assunto. A pesquisa usa fontes públicas e
        verificáveis, e <strong>toda informação com número é conferida na origem antes de ser
        publicada</strong>. A redação passa por revisão antes de ir ao ar, e textos já publicados são
        corrigidos sempre que aparece erro.
      </p>
      <p>
        Ferramentas de inteligência artificial ajudam na pesquisa e na produção. A decisão sobre o
        que é publicado, e a responsabilidade por isso, é humana.
      </p>

      <h2>Quando erramos</h2>
      <p>
        Errar é parte de publicar. Esconder o erro não é. Se você encontrar informação incorreta,
        escreva para <strong>[E-MAIL DE CONTATO]</strong> — correções têm prioridade sobre qualquer
        pauta nova, e o texto é ajustado com a mudança sinalizada.
      </p>

      <h2>Fale Conosco</h2>
      <p>
        Sugestão de pauta, correção, parceria ou reclamação:{' '}
        <strong>[E-MAIL DE CONTATO]</strong>.
      </p>
      <p>
        Você também pode começar pela <a href="/busca">busca no acervo</a> ou por{' '}
        <a href="/historias-inspiradoras">Histórias Inspiradoras</a>, que é onde as leitoras contam
        as delas.
      </p>
    </PaginaInstitucional>
  );
}
