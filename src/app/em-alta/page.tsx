import GradeArtigos, { CardArtigo } from '@/components/GradeArtigos';
import { Reveal, TituloRevelado } from '@/components/Motion';
import { FundoSecao } from '@/components/FundoTematico';
import VoceEstavaLendo from '@/components/VoceEstavaLendo';
import { getTodos, CATEGORIAS, Artigo } from '@/lib/artigos';
import { dataPorExtenso, paraISO } from '@/lib/data';

export const metadata = {
  title: 'Em Alta Agora | Bem Mais Bella',
  description:
    'O que esta em movimento no acervo: o que acabou de sair, os assuntos que mais se repetem e por onde as leitoras estao entrando.',
};

/**
 * "Em Alta Agora".
 *
 * Camada transversal proposta na arquitetura v4: um lugar que nao pertence a
 * nenhuma categoria e mostra o que esta em movimento.
 *
 * A parte dificil aqui foi de honestidade, nao de codigo. Um site estatico nao
 * tem como saber o que esta viralizando no TikTok, e nao existe medicao de
 * audiencia neste projeto. Entao esta pagina nao diz "esta bombando": ela diz
 * exatamente o que sabe medir — o que foi publicado por ultimo, quais assuntos
 * o acervo mais cobre, e o que ESTE navegador andou lendo. Quando existir dado
 * real de audiencia, os blocos entram aqui sem mudar a estrutura.
 */

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

export default function Page() {
  const todos = getTodos();
  const hoje = new Date().toISOString().slice(0, 10);

  const publicados = todos
    .filter(a => paraISO(a.publishedAt) && paraISO(a.publishedAt) <= hoje)
    .sort((a, b) => paraISO(b.publishedAt).localeCompare(paraISO(a.publishedAt)));

  const recentes = publicados.slice(0, 6);

  // Datados a frente. Existem no acervo, entao aparecem — mas nao como
  // novidade de hoje, que seria mentira de calendario.
  const agendados = todos
    .filter(a => paraISO(a.publishedAt) > hoje)
    .sort((a, b) => paraISO(a.publishedAt).localeCompare(paraISO(b.publishedAt)))
    .slice(0, 4);

  // "Assunto em alta" aqui significa: o assunto que o acervo mais cobre.
  // E uma medida do site, nao do Brasil — e o texto da pagina diz isso.
  const porSub = new Map<string, { nome: string; cat: string; catNome: string; total: number }>();
  for (const a of todos) {
    if (!a.subcategory || !a.categorySlug) continue;
    const chave = a.categorySlug + '|' + a.subcategory.toLowerCase();
    const atual = porSub.get(chave);
    if (atual) atual.total++;
    else porSub.set(chave, {
      nome: a.subcategory.charAt(0).toUpperCase() + a.subcategory.slice(1),
      cat: a.categorySlug,
      catNome: a.category,
      total: 1,
    });
  }
  const assuntos = Array.from(porSub.values())
    .filter(s => s.total >= 3)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  const porCategoria = CATEGORIAS.map(c => {
    const dela = publicados.filter(a => a.categorySlug === c.slug);
    return dela.length ? { cat: c, artigo: dela[0] } : null;
  }).filter(Boolean) as { cat: (typeof CATEGORIAS)[number]; artigo: Artigo }[];

  return (
    <main className="min-h-screen">
      <section className="relative py-20">
        <FundoSecao slug="estilo-e-beleza" />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
              Transversal
            </span>
          </Reveal>
          <TituloRevelado
            texto="Em Alta Agora"
            as="h1"
            className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl text-[#f5f0e6] mt-2"
          />
          <Reveal delay={0.1}>
            <p className="text-[#9AA4AF] text-lg mt-5 max-w-2xl leading-relaxed">
              O que esta em movimento no Bem Mais Bella: o que acabou de sair, os assuntos que o
              acervo mais cobre e por onde voce mesma estava passando.
            </p>
            <p className="text-[#9AA4AF]/55 text-sm mt-4 max-w-2xl leading-relaxed">
              Esta pagina mede o que da para medir aqui dentro. Ela nao diz o que esta viralizando
              nas redes — para isso seria preciso um dado que a gente ainda nao tem, e preferimos
              nao fingir que temos.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <Reveal>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#f5f0e6] mb-2">
            Acabou de sair
          </h2>
          <p className="text-[#9AA4AF]/70 text-sm mb-8">
            Os ultimos publicados, do mais novo para o mais antigo.
          </p>
        </Reveal>
        <GradeArtigos artigos={recentes.map(paraCard)} />
      </section>

      <VoceEstavaLendo />

      <section className="relative py-20">
        <FundoSecao slug="carreira-e-financas" />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#f5f0e6] mb-2">
              Assuntos que mais aparecem
            </h2>
            <p className="text-[#9AA4AF]/70 text-sm mb-8 max-w-2xl">
              Onde o acervo e mais fundo hoje. Quanto maior o numero, mais materia existe publicada
              sobre aquele assunto.
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {assuntos.map(s => (
              <a
                key={s.cat + s.nome}
                href={'/' + s.cat}
                className="group px-5 py-3 rounded-full bg-[#45495f]/25 border border-[rgba(240,72,133,0.15)] hover:border-[#F72585]/50 hover:bg-[#45495f]/40 transition-all"
              >
                <span className="text-[#f5f0e6] text-sm">{s.nome}</span>
                <span className="text-[#F72585] text-sm font-bold ml-2">{s.total}</span>
                <span className="block text-[10px] uppercase tracking-wider text-[#9AA4AF]/50 mt-0.5">
                  {s.catNome}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#f5f0e6] mb-2">
            O mais recente de cada area
          </h2>
          <p className="text-[#9AA4AF]/70 text-sm mb-8">
            Uma porta por categoria, para nenhuma area ficar escondida atras da mais movimentada.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {porCategoria.map(({ cat, artigo }) => (
            <a
              key={cat.slug}
              href={'/artigos/' + artigo.slug}
              className="group block p-5 rounded-2xl bg-[#45495f]/15 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/45 hover:bg-[#45495f]/25 transition-all"
            >
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#F72585]">
                {cat.nome}
              </span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl text-[#f5f0e6] mt-2 leading-tight group-hover:text-[#F72585] transition-colors">
                {artigo.title}
              </h3>
              {artigo.publishedAt ? (
                <span className="block text-xs text-[#9AA4AF]/50 mt-2">
                  {dataPorExtenso(artigo.publishedAt)}
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </section>

      {agendados.length ? (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <Reveal>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#f5f0e6] mb-2">
              Ja escrito, ainda por sair
            </h2>
            <p className="text-[#9AA4AF]/70 text-sm mb-8 max-w-2xl">
              Estes textos estao prontos e datados para os proximos dias. Ficam aqui porque ja da
              para ler — so nao entram como novidade de hoje.
            </p>
          </Reveal>
          <div className="space-y-3">
            {agendados.map(a => (
              <a
                key={a.slug}
                href={'/artigos/' + a.slug}
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 p-4 rounded-xl bg-[#45495f]/10 border border-[rgba(240,72,133,0.08)] hover:border-[#F72585]/40 transition-all"
              >
                <span className="text-xs text-[#F72585] font-bold whitespace-nowrap">
                  {dataPorExtenso(a.publishedAt)}
                </span>
                <span className="text-[#f5f0e6] group-hover:text-[#F72585] transition-colors">
                  {a.title}
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
