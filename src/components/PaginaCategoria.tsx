import GradeArtigos, { CardArtigo } from './GradeArtigos';
import { Reveal, TituloRevelado } from './Motion';
import {
  getPorCategoriaSlug,
  subcategoriasDe,
  nomeCategoria,
  vozDe,
  CATEGORIAS,
  Artigo,
} from '../lib/artigos';
import { areaDe } from '../lib/taxonomia';

function paraCard(a: Artigo): CardArtigo {
  return {
    slug: a.slug,
    title: a.title,
    description: a.description,
    hero: a.hero,
    category: a.category,
    categorySlug: a.categorySlug,
    subcategory: a.subcategory,
    author: a.author,
    readingTime: a.readingTime,
  };
}

/**
 * Página de categoria (nivel 1 da árvore editorial).
 *
 * Os niveis 2 e 3 aparecem como seções ancoradas dentro desta página, não como
 * rotas proprias: com 178 artigos para ~150 folhas da árvore, cada folha viraria
 * uma página de um artigo só — conteúdo magro, que e o que reprova no AdSense.
 * Quando uma subcategoria tiver volume, promover para rota e trivial.
 */
export default function PaginaCategoria({
  cat,
  descricao,
}: {
  cat: string;
  descricao?: string;
}) {
  const artigos = getPorCategoriaSlug(cat);
  const subs = subcategoriasDe(cat);
  const nome = nomeCategoria(cat);
  const voz = vozDe(cat);
  const irmas = CATEGORIAS.filter(c => c.slug !== cat);

  const semSub = artigos.filter(a => !a.subcategory);
  const area = areaDe(cat);

  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-8">
        <nav className="text-xs uppercase tracking-[0.2em] text-[#9AA4AF]/60 mb-4 flex flex-wrap gap-2">
          <a href="/" className="hover:text-[#F72585] transition">Inicio</a>
          <span>/</span>
          <span className="text-[#F72585]">{nome}</span>
        </nav>

        <TituloRevelado
          as="h1"
          texto={nome}
          className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-6xl text-[#f5f0e6]"
        />

        {voz ? (
          <Reveal delay={0.08}>
            <p className="font-[family-name:var(--font-cormorant)] italic text-2xl lg:text-3xl text-[#F72585] mt-4">
              {voz.slogan}
            </p>
            <p className="text-[#9AA4AF]/55 text-xs uppercase tracking-[0.25em] mt-3">
              Escrito na voz {voz.voz.startsWith('A ') ? 'd' + voz.voz.charAt(0).toLowerCase() + voz.voz.slice(1) : 'de ' + voz.voz}
            </p>
          </Reveal>
        ) : null}

        <p className="text-[#9AA4AF] mt-6 max-w-2xl leading-relaxed">
          {descricao ||
            `${artigos.length} ${artigos.length === 1 ? 'artigo publicado' : 'artigos publicados'} em ${nome}.`}
        </p>

        {!artigos.length && area?.vazia ? (
          <Reveal delay={0.1}>
            <p className="text-[#9AA4AF]/70 mt-5 max-w-2xl leading-relaxed border-l-2 border-[#F72585]/40 pl-5">
              {area.vazia}
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <a href="/em-alta" className="btn-rosa px-6 py-3 rounded-full font-bold text-sm">
                Ver o que esta em alta
              </a>
              <a
                href="/politica-editorial"
                className="px-6 py-3 rounded-full bg-[#45495f]/30 border border-[rgba(240,72,133,0.2)] text-sm text-[#9AA4AF] hover:text-[#F72585] hover:border-[#F72585]/50 transition"
              >
                Ler a politica editorial
              </a>
            </div>
          </Reveal>
        ) : null}

        {area?.regra ? (
          <p className="text-[#9AA4AF]/50 text-xs mt-8 max-w-2xl leading-relaxed">
            <strong className="text-[#9AA4AF]/70">Regra desta area:</strong> {area.regra}{' '}
            <a href="/politica-editorial" className="text-[#F72585] hover:underline">
              Politica editorial
            </a>
          </p>
        ) : null}

        {subs.length > 1 ? (
          <div className="flex flex-wrap gap-3 mt-8">
            {subs.map(s => (
              <a
                key={s.slug}
                href={'#' + s.slug}
                className="px-5 py-2 rounded-full bg-[#45495f]/30 border border-[rgba(240,72,133,0.15)] text-sm text-[#9AA4AF] hover:text-[#F72585] hover:border-[#F72585]/50 transition"
              >
                {s.nome} <span className="text-[#9AA4AF]/50">{s.total}</span>
              </a>
            ))}
          </div>
        ) : null}
      </section>

      {subs.length > 1 ? (
        subs.map(s => (
          <section key={s.slug} id={s.slug} className="max-w-6xl mx-auto px-6 pb-20 scroll-mt-24">
            <Reveal className="flex items-baseline justify-between mb-8 gap-4 border-b border-[rgba(240,72,133,0.12)] pb-4">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl text-[#f5f0e6]">{s.nome}</h2>
              <span className="text-[#9AA4AF]/60 text-sm whitespace-nowrap">
                {s.total} {s.total === 1 ? 'artigo' : 'artigos'}
              </span>
            </Reveal>
            <GradeArtigos artigos={artigos.filter(a => a.subcategorySlug === s.slug).map(paraCard)} />
          </section>
        ))
      ) : (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <GradeArtigos artigos={artigos.map(paraCard)} />
        </section>
      )}

      {subs.length > 1 && semSub.length ? (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="flex items-baseline justify-between mb-8 gap-4 border-b border-[rgba(240,72,133,0.12)] pb-4">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl text-[#f5f0e6]">Mais de {nome}</h2>
            <span className="text-[#9AA4AF]/60 text-sm whitespace-nowrap">{semSub.length}</span>
          </div>
          <GradeArtigos artigos={semSub.map(paraCard)} />
        </section>
      ) : null}

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold mb-5">Continue navegando</h2>
        <div className="flex flex-wrap gap-3">
          {irmas.map(c => (
            <a
              key={c.slug}
              href={'/' + c.slug}
              className="px-5 py-2 rounded-full bg-[#45495f]/20 border border-[rgba(240,72,133,0.12)] text-sm text-[#9AA4AF] hover:text-[#F72585] hover:border-[#F72585]/40 transition"
            >
              {c.nome}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
