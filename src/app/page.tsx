'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import TiltCard from '../components/TiltCard';
import {
  Reveal, RevealLista, ItemLista, TituloRevelado, ProgressoLeitura,
  Contador, Magnetico, CartaoBrilho,
} from '../components/Motion';
import FundoTematico, { FundoSecao } from '../components/FundoTematico';
import ParaVoce from '../components/home/ParaVoce';
import Quiz from '../components/home/Quiz';
import destaques from '../lib/destaques.json';
import home from '../lib/home.json';
import { dataPorExtenso } from '../lib/data';

/** Atalhos de intencao: cada um leva a um lugar que existe. */
const INTENCOES = [
  { texto: 'Cuidar de mim', url: '/saude-e-bem-estar' },
  { texto: 'Mudar meu visual', url: '/estilo-e-beleza' },
  { texto: 'Organizar o dinheiro', url: '/carreira-e-financas' },
  { texto: 'Ser mae', url: '/maternidade-e-familia' },
  { texto: 'Melhorar minha relacao', url: '/relacionamentos-conscientes' },
  { texto: 'Me conhecer melhor', url: '/desenvolvimento-pessoal' },
  { texto: 'Casar com proposito', url: '/casamentos-com-proposito' },
  { texto: 'Viver melhor o dia a dia', url: '/estilo-de-vida' },
  { texto: 'Me inspirar', url: '/historias-inspiradoras' },
];

export default function HomePage() {
  const { scrollY } = useScroll();
  const parado = useReducedMotion();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <>
      <ProgressoLeitura />

      {/* === HERO === */}
      <section className="relative h-screen overflow-hidden flex items-end">
        <motion.div
          style={parado ? undefined : { y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img src="/images/hero-premium.webp" alt="" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#240046] via-[#240046]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#240046]/60 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-32 pt-64 w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-3 py-1 bg-[#F72585]/20 text-[#F72585] rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-[#F72585]/30"
          >
            Editorial — 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-[family-name:var(--font-cormorant)] text-7xl lg:text-9xl font-light text-[#f5f0e6] leading-[0.9] mb-8"
          >
            Bem Mais<br />
            <span className="italic font-light text-[#F72585] drop-shadow-[0_0_30px_rgba(240,72,133,0.5)]">
              Bella.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl lg:text-2xl text-[#9AA4AF] max-w-2xl leading-relaxed font-light mb-10"
          >
            Notícias, estilo, saúde e desenvolvimento para a mulher brasileira. Conteúdo que respeita
            o seu ritmo e celebra a sua história.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <Magnetico forca={0.18}>
              <a href="#busca-hoje" className="btn-rosa px-8 py-4 text-base inline-block">Explorar Conteúdo</a>
            </Magnetico>
            <Magnetico forca={0.18}>
              <a
                href="#comunidade"
                className="inline-block px-8 py-4 rounded-full border border-[#F72585]/40 text-[#F72585] hover:bg-[#F72585]/10 transition-all text-base font-medium"
              >
                Receber Novidades
              </a>
            </Magnetico>
          </motion.div>
        </div>

        <motion.div
          animate={parado ? undefined : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#9AA4AF] text-xs tracking-widest uppercase flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-[#F72585] to-transparent" />
        </motion.div>
      </section>

      {/* === MARQUEE === */}
      <section className="bg-[#1a0a2e] py-5 overflow-hidden border-y border-[rgba(240,72,133,0.15)]">
        <div className="flex gap-6 animate-[marquee_40s_linear_infinite] whitespace-nowrap w-max">
          {[...Array(2)].flatMap((_, i) =>
            home.populares.map(c => (
              <a
                key={`${i}-${c.slug}`}
                href={'/' + c.slug}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#45495f]/40 text-[#9AA4AF] border border-[rgba(240,72,133,0.15)] hover:border-[#F72585] hover:text-[#F72585] transition-all text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F72585]" /> {c.nome}
              </a>
            ))
          )}
        </div>
      </section>

      {/* === 1. O QUE VOCÊ BUSCA HOJE? === */}
      <section id="busca-hoje" className="relative py-24 scroll-mt-20">
        <FundoSecao slug="desenvolvimento-pessoal" />
        <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
            Comece por aqui
          </span>
        </Reveal>
        <TituloRevelado
          texto="O Que Você Busca Hoje?"
          className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-6xl text-[#f5f0e6] mt-2"
        />
        <Reveal delay={0.1}>
          <p className="text-[#9AA4AF] mt-4 max-w-2xl leading-relaxed">
            Diga o que te trouxe até aqui. Cada caminho leva direto para os artigos daquele assunto —
            são <Contador ate={home.totalArtigos} className="text-[#F72585] font-bold" /> no acervo.
          </p>
        </Reveal>

        <RevealLista className="flex flex-wrap gap-3 mt-10" passo={0.05}>
          {INTENCOES.map(i => (
            <ItemLista key={i.url}>
              <a
                href={i.url}
                className="inline-block px-6 py-3 rounded-full bg-[#45495f]/25 border border-[rgba(240,72,133,0.18)] text-[#f5f0e6] hover:border-[#F72585] hover:bg-[#F72585]/10 hover:-translate-y-0.5 transition-all"
              >
                {i.texto}
              </a>
            </ItemLista>
          ))}
        </RevealLista>

        <Reveal delay={0.2}>
          <form role="search" action="/busca" method="get" className="mt-10 flex gap-3 max-w-xl">
            <input
              type="search"
              name="q"
              placeholder="Ou busque por palavra: journaling, brazilcore, pós-parto..."
              aria-label="Buscar no acervo"
              className="flex-1 px-6 py-4 rounded-full bg-[#45495f]/40 border border-[rgba(240,72,133,0.2)] text-[#f5f0e6] placeholder:text-[#9AA4AF]/50 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all"
            />
            <button type="submit" className="btn-rosa px-7 py-4 rounded-full font-bold">Buscar</button>
          </form>
        </Reveal>
        </div>
      </section>

      {/* === 2. SEÇÕES POPULARES === */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">Navegue</span>
        </Reveal>
        <TituloRevelado
          texto="Seções Populares"
          className="font-[family-name:var(--font-cormorant)] text-5xl text-[#f5f0e6] mt-2 mb-10"
        />

        <RevealLista className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {home.populares.map(c => (
            <ItemLista key={c.slug}>
              <CartaoBrilho className="rounded-2xl overflow-hidden">
              <a
                href={'/' + c.slug}
                className="group relative block h-52 rounded-2xl overflow-hidden border border-[rgba(240,72,133,0.14)] hover:border-[#F72585]/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(240,72,133,0.18)]"
              >
                <FundoTematico slug={c.slug} />
                <div className="relative z-30 h-full flex flex-col justify-end p-6">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-3xl text-[#f5f0e6] group-hover:text-[#F72585] transition-colors">
                    {c.nome}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[#9AA4AF]/75 text-sm">
                      <Contador ate={c.total} /> {c.total === 1 ? 'artigo' : 'artigos'}
                    </span>
                    <span className="text-[#F72585] text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Ver todos →
                    </span>
                  </div>
                </div>
              </a>
              </CartaoBrilho>
            </ItemLista>
          ))}
        </RevealLista>
      </section>

      {/* === 3. DESTAQUES DA TEMPORADA === */}
      <section id="destaques" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Reveal>
              <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
                Em destaque
              </span>
            </Reveal>
            <TituloRevelado
              texto="Destaques da Temporada"
              className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-6xl text-[#f5f0e6] mt-2"
            />
            <Reveal delay={0.1}>
              <p className="text-[#9AA4AF] mt-3 max-w-xl">
                Seleção da casa, com curadoria e voz editorial.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {destaques.map((a, i) => (
            <TiltCard
              key={a.slug}
              className="group block rounded-2xl overflow-hidden bg-[#45495f]/20 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/50 transition-all hover:shadow-[0_20px_60px_rgba(240,72,133,0.15)]"
            >
              <motion.a
                href={'/artigos/' + a.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                className="block"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.title}
                    loading="lazy"
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#240046] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#240046]/90 backdrop-blur text-[#F72585] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#F72585]/30">
                    {a.cat}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] leading-tight mb-3 group-hover:text-[#F72585] transition-colors">
                    {a.title}
                  </h3>
                  {a.desc ? (
                    <p className="text-[#9AA4AF]/80 text-sm leading-relaxed mb-5 line-clamp-3">{a.desc}</p>
                  ) : null}
                  <div className="flex items-center justify-between text-xs text-[#9AA4AF]/60">
                    <span>Por <strong className="text-[#F72585]">{a.author}</strong></span>
                    {a.read ? <span>{a.read}</span> : null}
                  </div>
                </div>
              </motion.a>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* === 4. NOVIDADES DO MOMENTO === */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
            Recém-publicado
          </span>
        </Reveal>
        <TituloRevelado
          texto="Novidades do Momento"
          className="font-[family-name:var(--font-cormorant)] text-5xl text-[#f5f0e6] mt-2 mb-10"
        />

        <RevealLista className="space-y-4" passo={0.06}>
          {home.novidades.map(a => (
            <ItemLista key={a.slug}>
              <a
                href={'/artigos/' + a.slug}
                className="group flex gap-5 items-center p-4 rounded-2xl bg-[#45495f]/15 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/45 hover:bg-[#45495f]/25 transition-all"
              >
                <img
                  src={a.img}
                  alt=""
                  loading="lazy"
                  className="w-28 h-20 sm:w-40 sm:h-26 object-cover rounded-xl shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-[#F72585]">{a.cat}</span>
                    {a.date ? (
                      <span className="text-[#9AA4AF]/50">{dataPorExtenso(String(a.date))}</span>
                    ) : null}
                  </div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl text-[#f5f0e6] leading-tight mt-1 group-hover:text-[#F72585] transition-colors">
                    {a.title}
                  </h3>
                  {a.desc ? (
                    <p className="text-[#9AA4AF]/75 text-sm mt-1 line-clamp-2">{a.desc}</p>
                  ) : null}
                </div>
              </a>
            </ItemLista>
          ))}
        </RevealLista>
      </section>

      {/* === 5. PARA VOCÊ: DICAS PERSONALIZADAS === */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <ParaVoce />
      </section>

      {/* === 6. QUIZ === */}
      <section id="quiz" className="relative py-20 scroll-mt-20">
        <FundoSecao slug="historias-inspiradoras" />
        <div className="relative max-w-4xl mx-auto px-6">
        <Reveal>
          <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">Quiz</span>
        </Reveal>
        <TituloRevelado
          texto="Descubra Seu Estilo e Propósito"
          className="font-[family-name:var(--font-cormorant)] text-5xl text-[#f5f0e6] mt-2 mb-4"
        />
        <Reveal delay={0.1}>
          <p className="text-[#9AA4AF] mb-10 max-w-2xl">
            Três perguntas. No fim, a seção do site que mais conversa com o seu momento.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Quiz />
        </Reveal>
        </div>
      </section>

      {/* === 7. JUNTE-SE À COMUNIDADE === */}
      <section id="comunidade" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-20">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-[rgba(240,72,133,0.25)] bg-gradient-to-br from-[#F72585]/12 via-[#45495f]/25 to-[#240046]/50 p-10 md:p-16 text-center">
            <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
              Junte-se à comunidade
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl text-[#f5f0e6] mt-3">
              Uma carta por semana, sem ruído.
            </h2>
            <p className="text-[#9AA4AF] mt-4 max-w-xl mx-auto leading-relaxed">
              Os melhores textos da semana, mais o que ainda não foi publicado. Escrito pela Lillith,
              lido por quem tem pressa.
            </p>

            <form className="mt-9 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                required
                placeholder="Seu melhor e-mail"
                aria-label="Seu e-mail"
                className="flex-1 px-6 py-4 rounded-full bg-[#240046]/80 border border-[rgba(240,72,133,0.3)] text-[#f5f0e6] placeholder:text-[#9AA4AF]/40 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all"
              />
              <button type="submit" className="btn-rosa px-8 py-4 rounded-full font-bold whitespace-nowrap">
                Quero Receber
              </button>
            </form>

            <p className="text-xs text-[#9AA4AF]/50 mt-4">
              Você pode cancelar quando quiser. A gente também.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
