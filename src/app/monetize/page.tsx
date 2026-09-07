import { Reveal, TituloRevelado } from '@/components/Motion';
import { FundoSecao } from '@/components/FundoTematico';
import { getTodos } from '@/lib/artigos';

/**
 * Midia kit — rascunho interno, fora do indice.
 *
 * A versao anterior estava publica e vendia espaco publicitario com um numero
 * inventado: "alcance 8.000+ mulheres engajadas", num site que nunca esteve no
 * ar. Isso nao e otimismo de copy — e declarar audiencia inexistente a quem vai
 * pagar por ela, e e o que destroi a relacao com o primeiro anunciante no dia
 * em que ele pede o relatorio. A pagina tambem mostrava a meta interna de
 * faturamento ("R$ 2.000 ate 30/11") para qualquer um com o link, dizia "8
 * categorias" quando ha nove com conteudo, e o botao apontava para `href="#"`.
 *
 * Agora: `noindex`, sem numero de audiencia, e so com o que da para contar do
 * disco. Preco e alcance entram quando houver medicao real para sustenta-los.
 */

export const metadata = {
  title: 'Mídia Kit (rascunho) | Bem Mais Bella',
  robots: { index: false, follow: false },
};

export default function Page() {
  const artigos = getTodos();
  const areas = new Set(artigos.map(a => a.categorySlug).filter(Boolean));

  return (
    <main className="min-h-screen">
      <section className="relative py-24">
        <FundoSecao slug="carreira-e-financas" />
        <div className="relative max-w-3xl mx-auto px-6">
          <Reveal>
            <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
              Rascunho interno — não indexado
            </span>
          </Reveal>
          <TituloRevelado
            texto="Mídia Kit"
            as="h1"
            className="font-[family-name:var(--font-cormorant)] text-5xl text-[#f5f0e6] mt-2"
          />

          <Reveal delay={0.1}>
            <p className="text-[#9AA4AF] text-lg mt-6 leading-relaxed">
              Esta página é rascunho. Ela se preenche quando o site estiver no ar e houver medição
              de audiência — não antes.
            </p>

            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] mt-12">
              O que dá para afirmar hoje
            </h2>
            <ul className="mt-4 space-y-2 text-[#9AA4AF]">
              <li>
                <strong className="text-[#f5f0e6] tabular-nums">{artigos.length}</strong> artigos
                publicados, contados do acervo.
              </li>
              <li>
                <strong className="text-[#f5f0e6] tabular-nums">{areas.size}</strong> áreas
                editoriais com conteúdo.
              </li>
              <li>Todo o acervo com capa própria e imagens no corpo do texto.</li>
            </ul>

            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] mt-12">
              O que ainda não dá
            </h2>
            <p className="text-[#9AA4AF] mt-4 leading-relaxed">
              Alcance, visitantes por mês, taxa de abertura, perfil de audiência. O site não foi
              publicado, então qualquer número aqui seria invenção. Preço de conteúdo patrocinado e
              de banner depende disso: sem audiência medida, não há como precificar sem chutar.
            </p>

            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] mt-12">
              Regra que vale desde já
            </h2>
            <p className="text-[#9AA4AF] mt-4 leading-relaxed">
              Conteúdo patrocinado é identificado como tal no próprio texto, e a existência de
              pagamento não muda a avaliação. Está na{' '}
              <a href="/politica-editorial" className="text-[#F72585] hover:underline">
                política editorial
              </a>
              , que é pública.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
