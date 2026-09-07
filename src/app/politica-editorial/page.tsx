import PaginaInstitucional from '@/components/PaginaInstitucional';
import { EDITORIAIS, TRANSVERSAIS } from '@/lib/taxonomia';

export const metadata = {
  title: 'Política Editorial | Bem Mais Bella',
  description:
    'Como o conteudo do Bem Mais Bella e apurado, o que nao entra, como corrigimos erro e como identificamos publicidade.',
};

/**
 * Politica editorial.
 *
 * Esta pagina existe por um motivo pratico: o site promete na Sobre Nos que
 * "numero so com fonte", e areas novas — famosos, compras — trazem tentacoes
 * que essa frase sozinha nao cobre. Aqui a regra fica escrita antes da primeira
 * materia da area, e nao depois do primeiro problema.
 *
 * As regras por area saem de `src/lib/taxonomia.ts`, o mesmo lugar que a pagina
 * da area le. Uma regra nao pode existir na politica e nao valer na pratica.
 */
export default function Page() {
  const comRegra = [...EDITORIAIS, ...TRANSVERSAIS].filter(a => a.regra);

  return (
    <PaginaInstitucional
      chapeu="Política Editorial"
      titulo="Política Editorial"
      resumo="Como o conteúdo é apurado, o que não entra, e o que acontece quando a gente erra."
      cor="carreira-e-financas"
    >
      <h2>Quem escreve</h2>
      <p>
        Todo o conteúdo é publicado sob a assinatura de <strong>Lillith Nogah</strong>, que é um
        pseudônimo — uma voz editorial, não uma pessoa com CPF. Por trás dela há uma operação
        enxuta, com apoio de ferramentas de inteligência artificial na pesquisa e na produção. A
        decisão sobre o que é publicado, e a responsabilidade por isso, é humana. Isso está
        explicado por inteiro em <a href="/sobre-nos">Sobre Nós</a>.
      </p>

      <h2>O que não entra</h2>
      <ul>
        <li>
          <strong>Número sem fonte.</strong> Se não dá para conferir na origem, a frase é reescrita
          sem o número. Preferimos uma afirmação sem estatística a uma estatística sem origem.
        </li>
        <li>
          <strong>Fonte inventada.</strong> Nenhum estudo, pesquisador, instituto ou levantamento é
          citado sem existir. Isso vale inclusive quando o texto ficaria mais convincente com um.
        </li>
        <li>
          <strong>Promessa de resultado.</strong> Nenhum texto garante emagrecimento, retorno
          financeiro, cura, prazo ou transformação. Quando há um caminho, ele é descrito como
          caminho — não como garantia.
        </li>
        <li>
          <strong>Rumor sobre pessoa real.</strong> Nem sobre famosos, nem sobre leitoras, nem
          sobre ninguém.
        </li>
      </ul>

      <h2>Como uma informação é verificada</h2>
      <p>
        Dado público entra com a origem dita no texto — o órgão, a pesquisa, o ano. Fala de pessoa
        entra a partir de registro atribuível: o que ela publicou, disse em entrevista ou anunciou.
        Experiência pessoal entra identificada como experiência pessoal, nunca vestida de evidência.
      </p>

      <h2>Regras por área</h2>
      <p>
        Algumas áreas exigem cuidado além do geral. Estas regras aparecem também na própria página
        da área, para quem lê saber sob qual critério aquele texto foi escrito:
      </p>
      <ul>
        {comRegra.map(a => (
          <li key={a.slug}>
            <a href={'/' + a.slug}>
              <strong>{a.nome}</strong>
            </a>{' '}
            — {a.regra}
          </li>
        ))}
      </ul>

      <h2>Conteúdo não substitui profissional</h2>
      <p>
        Sobre saúde, dinheiro, maternidade e direito, este site informa. Quem decide é você, com
        quem cuida de você. Nada aqui é consulta médica, consultoria financeira ou orientação
        jurídica, por mais detalhado que o texto seja.
      </p>

      <h2>Publicidade e afiliados</h2>
      <p>
        Conteúdo patrocinado é identificado como tal no próprio texto. Link de afiliado é
        identificado onde aparece, com a informação de que o site recebe comissão e de que quem
        compra não paga a mais por isso. <strong>A existência de comissão não muda a avaliação</strong>:
        produto ruim continua descrito como ruim.
      </p>
      <p>
        Sobre o que indicamos, há duas situações e elas nunca se misturam. Quando alguém daqui usou
        o produto, o bloco diz <strong>"testado por aqui"</strong>. Quando não usou, diz
        <strong> "não testamos este produto"</strong> — e continua sendo uma indicação, não uma
        recomendação de uso. A frase aparece sozinha, tirada do dado; ninguém precisa lembrar de
        escrevê-la. E promessa de resultado que venha na página do fabricante é dele, não nossa:
        não repetimos número de vendas, nota de avaliação nem registro que não conferimos na origem.
      </p>

      <h2>Quando erramos</h2>
      <p>
        Errar é parte de publicar; esconder o erro não é. Correção tem prioridade sobre qualquer
        pauta nova. O texto é ajustado no próprio lugar, com a mudança sinalizada — não apagamos e
        fingimos que nunca esteve lá. Se você encontrou algo incorreto, o caminho está em{' '}
        <a href="/sobre-nos">Sobre Nós</a>.
      </p>

      <h2>O que fazemos com os seus dados</h2>
      <p>
        As partes personalizadas do site — <a href="/para-voce">Para Você</a>, o histórico em{' '}
        <a href="/em-alta">Em Alta</a>, o resultado do{' '}
        <a href="/ferramentas/diagnostico">Diagnóstico</a> — funcionam inteiramente dentro do seu
        navegador. Não há conta, não há perfil nosso sobre você e nada disso é enviado para
        servidor. Os detalhes estão na{' '}
        <a href="/politica-de-privacidade">Política de Privacidade</a>.
      </p>
    </PaginaInstitucional>
  );
}
