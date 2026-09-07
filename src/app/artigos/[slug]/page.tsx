import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getSlugs, getArtigo, getPorCategoriaSlug, nomeCategoria, limparImagensQuebradas } from '@/lib/artigos';
import RegistraLeitura from '@/components/RegistraLeitura';
import { Parallax, ProgressoLeitura, Reveal } from '@/components/Motion';
import FundoTematico from '@/components/FundoTematico';
import Comentarios from '@/components/Comentarios';
import Oferta from '@/components/Oferta';
import { dataPorExtenso } from '@/lib/data';

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs().filter((s) => s !== '').map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = getArtigo(params.slug);
  if (!a) return {};
  return {
    title: a.title + ' | Bem Mais Bella',
    description: a.description,
    alternates: { canonical: '/artigos/' + a.slug },
    openGraph: {
      title: a.title,
      description: a.description,
      images: a.hero ? [a.hero] : [],
      type: 'article',
    },
  };
}

/**
 * Distribui as imagens de secao entre os blocos <h2> do artigo, para o texto
 * nao virar um paredao. A capa fica no topo e nunca se repete no corpo.
 */
function comImagens(html: string, imagens: string[], alt: string): string {
  if (!imagens.length) return html;
  // Alguns artigos antigos nao usam <h2>. Nesses, quebramos por paragrafo,
  // senao o texto sai sem nenhuma imagem no corpo.
  let partes = html.split(/(?=<h2)/);
  if (partes.length < 2) partes = html.split(/(?=<p)/);
  if (partes.length < 2) return html;
  const passo = Math.max(1, Math.floor(partes.length / (imagens.length + 1)));
  let i = 0;
  return partes
    .map((p, idx) => {
      if (idx > 0 && idx % passo === 0 && i < imagens.length) {
        const src = imagens[i++];
        return (
          '<figure class="my-12 -mx-2 md:-mx-8 overflow-hidden rounded-3xl border border-[rgba(240,72,133,0.14)] shadow-[0_28px_80px_rgba(0,0,0,0.45)]">' +
          '<img src="' + src + '" alt="' + alt + '" loading="lazy" decoding="async" ' +
          'class="w-full aspect-[16/9] object-cover transition-transform duration-700 ease-out hover:scale-[1.03]" />' +
          '</figure>' + p
        );
      }
      return p;
    })
    .join('');
}

export default function ArtigoPage({ params }: { params: { slug: string } }) {
  const a = getArtigo(params.slug);
  if (!a) notFound();

  const secoes = [
    a.images.section1, a.images.section2, a.images.section3,
    a.images.section4, a.images.section5,
  ].filter(Boolean);

  // Tira as <img> quebradas do corpo antes de distribuir as imagens de secao.
  const corpo = limparImagensQuebradas(marked.parse(a.content) as string);
  const html = comImagens(corpo, secoes, a.title);

  // Sem foto util, a capa vira o fundo tematico da categoria.
  const temFoto = !!a.hero && !a.hero.includes('placeholder');

  const relacionados = getPorCategoriaSlug(a.categorySlug)
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      <ProgressoLeitura />
      <RegistraLeitura slug={a.slug} />

      <div className="relative h-[38vh] md:h-[52vh] w-full overflow-hidden">
        {temFoto ? (
          <>
            <Parallax src={a.hero} alt={a.title} className="absolute inset-0 h-full w-full" forca={70} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#240046] via-[#240046]/60 to-transparent" />
          </>
        ) : (
          <FundoTematico slug={a.categorySlug} />
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-24 relative">
        <nav className="text-[11px] uppercase tracking-[0.2em] text-[#9AA4AF]/70 mb-4 flex flex-wrap gap-2">
          <a href="/" className="hover:text-[#F72585] transition">Inicio</a>
          <span>/</span>
          {a.categorySlug ? (
            <a href={'/' + a.categorySlug} className="hover:text-[#F72585] transition">
              {nomeCategoria(a.categorySlug)}
            </a>
          ) : (
            <span>{a.category}</span>
          )}
        </nav>

        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl leading-tight text-[#f5f0e6]">
          {a.title}
        </h1>

        {a.description ? (
          <p className="mt-5 text-lg text-[#9AA4AF] leading-relaxed">{a.description}</p>
        ) : null}

        <div className="mt-6 pb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#9AA4AF]/70 border-b border-[rgba(240,72,133,0.15)]">
          <span>Por <strong className="text-[#F72585]">{a.author}</strong></span>
          {a.publishedAt ? <span>{dataPorExtenso(a.publishedAt)}</span> : null}
          {a.readingTime ? <span>{a.readingTime} de leitura</span> : null}
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:font-[family-name:var(--font-cormorant)] prose-headings:text-[#f5f0e6] prose-a:text-[#F72585] prose-strong:text-[#f5f0e6] prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      <Oferta areaSlug={a.categorySlug} />

      <Comentarios slug={a.slug} titulo={a.title} />

      {relacionados.length ? (
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <Reveal>
          <h2 className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold mb-6">
            Leia tambem em {nomeCategoria(a.categorySlug)}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relacionados.map((r) => (
              <a
                key={r.slug}
                href={'/artigos/' + r.slug}
                className="group block rounded-2xl overflow-hidden bg-[#45495f]/20 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/50 transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  {r.hero && !r.hero.includes('placeholder') ? (
                    <img
                      src={r.hero}
                      alt={r.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <FundoTematico slug={r.categorySlug} animado={false} />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl text-[#f5f0e6] leading-tight group-hover:text-[#F72585] transition-colors">
                    {r.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
          </Reveal>
        </section>
      ) : null}
    </main>
  );
}
