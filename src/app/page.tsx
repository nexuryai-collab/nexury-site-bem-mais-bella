'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const progress = useSpring(useTransform(scrollY, [0, 1000], [0, 100]), { stiffness: 100, damping: 30 });

  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + ' • ' + d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }));
    };
    update();
    setInterval(update, 60000);
  }, []);

  return (
    <>
      {/* === HERO — Parallax + Motion === */}
      <section className="relative h-screen overflow-hidden flex items-end">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img src="/images/hero-premium.webp" alt="Bem Mais Bella" className="w-full h-full object-cover scale-110" />
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
            ✦ Editorial — 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-[family-name:var(--font-cormorant)] text-7xl lg:text-9xl font-light text-[#f5f0e6] leading-[0.9] mb-8"
          >
            Bem Mais<br /><span className="italic font-light text-[#F72585] drop-shadow-[0_0_30px_rgba(240,72,133,0.5)]">Bella.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl lg:text-2xl text-[#9AABAF] max-w-2xl leading-relaxed font-light mb-10"
          >
            Notícias, estilo, saúde e desenvolvimento para a mulher brasileira. Conteúdo que respeita o seu ritmo e celebra a sua história.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap gap-4">
            <a href="#destaques" className="btn-rosa px-8 py-4 text-base">Explorar Conteúdo</a>
            <a href="#newsletter" className="px-8 py-4 rounded-full border border-[#F72585]/40 text-[#F72585] hover:bg-[#F72585]/10 transition-all text-base font-medium">Receber Novidades</a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#9AABAF] text-xs tracking-widest uppercase flex flex-col items-center gap-2">
          <span>Scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-[#F72585] to-transparent" />
        </motion.div>
      </section>

      {/* === SCROLL CONTÍNUO — Marquee === */}
      <section className="bg-[#1a0a2e] py-5 overflow-hidden border-y border-[rgba(240,72,133,0.15)]">
        <div className="flex gap-6 animate-[marquee_40s_linear_infinite] whitespace-nowrap w-max">
          {[...Array(2)].flatMap((_, i) => ["Estilo e Beleza","Saúde e Bem-Estar","Maternidade","Relacionamentos","Carreira","Desenvolvimento","Histórias Inspiradoras","Comunidade"].map(t => (
            <a key={`${i}-${t}`} href="#" className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#45495f]/40 text-[#9AABAF] border border-[rgba(240,72,133,0.15)] hover:border-[#F72585] hover:text-[#F72585] transition-all text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F72585]" /> {t}
            </a>
          )))}
        </div>
      </section>

      {/* === DESTAQUES — Grid Premium === */}
      <section id="destaques" className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">Em destaque</span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-6xl text-[#f5f0e6] mt-2">A semana em escolhas</h2>
            <p className="text-[#9AABAF] mt-3 max-w-xl">Artigos selecionados para você, com curadoria e voz editorial.</p>
          </div>
          <a href="#" className="text-[#F72585] hover:text-[#f08eb0] transition text-sm font-bold uppercase tracking-widest flex items-center gap-2 self-start md:self-auto">
            Ver todos <span>→</span>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { cat: "Saúde e Bem-Estar", title: "Emagrecer em Casa: Guia Definitivo", img: "/images/fitness-2026/hero.webp", desc: "Treino, nutrição, motivação. Para começar hoje, no seu ritmo.", author: "Lillith Nogah", read: "12 min" },
            { cat: "Estilo e Beleza", title: "Moda Sustentável: Vestir com Alma", img: "/images/moda-consciente-2026/hero.webp", desc: "Guarda-roupa essencial, escolhas conscientes para todos os corpos.", author: "Lillith Nogah", read: "10 min" },
            { cat: "Maternidade", title: "Maternidade Consciente: Antes, Durante, Depois", img: "/images/maternidade-consciente-2026/hero.webp", desc: "Histórias reais e dicas práticas para a jornada.", author: "Lillith Nogah", read: "15 min" },
          ].map((a, i) => (
            <TiltCard className="group block rounded-2xl overflow-hidden bg-[#45495f]/20 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/50 transition-all hover:shadow-[0_20px_60px_rgba(240,72,133,0.15)]"><motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="block"
            >
              <div className="relative h-60 overflow-hidden">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#240046] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#240046]/90 backdrop-blur text-[#F72585] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#F72585]/30">{a.cat}</span>
              </div>
              <div className="p-7">
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] leading-tight mb-3 group-hover:text-[#F72585] transition-colors">{a.title}</h3>
                <p className="text-[#9AABAF]/80 text-sm leading-relaxed mb-5">{a.desc}</p>
                <div className="flex items-center justify-between text-xs text-[#9AABAF]/60">
                  <span>Por <strong className="text-[#F72585]">{a.author}</strong></span>
                  <span>⏱ {a.read}</span>
                </div>
              </div>
            </motion.a></TiltCard>
          ))}
        </div>
      </section>

      {/* === CITAÇÃO EDITORIAL === */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="text-6xl text-[#F72585] font-serif">"</span>
          <p className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl text-[#f5f0e6] italic leading-relaxed my-6">
            Você não precisa ser perfeita. Precisa ser constante. O melhor treino é aquele que você faz. A melhor refeição é aquela que você se sente bem ao comer.
          </p>
          <span className="text-[#F72585] text-sm font-bold uppercase tracking-[0.3em]">— Lillith Nogah</span>
        </motion.div>
      </section>

      {/* === CATEGORIAS — Grid Interativo === */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">Explore</span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl text-[#f5f0e6] mt-2">O que te chama hoje?</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Estilo e Beleza", sub: "Moda • Beleza • Maquiagem", icon: "💄", color: "from-[#F72585]/20" },
            { name: "Saúde e Bem-Estar", sub: "Nutrição • Fitness • Autocuidado", icon: "🧘", color: "from-[#9AABAF]/20" },
            { name: "Maternidade", sub: "Gravidez • Bebê • Família", icon: "👶", color: "from-[#F72585]/20" },
            { name: "Relacionamentos", sub: "Conexão • Intimidade", icon: "💞", color: "from-[#9AABAF]/20" },
            { name: "Carreira e Finanças", sub: "Vocação • Investimento", icon: "💼", color: "from-[#F72585]/20" },
            { name: "Estilo de Vida", sub: "Viagens • Decoração • Gastronomia", icon: "✈️", color: "from-[#9AABAF]/20" },
            { name: "Desenvolvimento", sub: "Autoconhecimento • Espiritualidade", icon: "🌱", color: "from-[#F72585]/20" },
            { name: "Histórias", sub: "Relatos • Entrevistas • Reflexões", icon: "✨", color: "from-[#9AABAF]/20" },
          ].map((c, i) => (
            <motion.a
              key={c.name}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`group relative p-6 rounded-2xl bg-[#45495f]/30 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/60 transition-all overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <span className="text-4xl mb-3 block transform group-hover:scale-110 transition-transform">{c.icon}</span>
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl text-[#f5f0e6] mb-1 group-hover:text-[#F72585] transition">{c.name}</h3>
                <p className="text-xs text-[#9AABAF]/60">{c.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* === NEWSLETTER — CTA Premium === */}
      <section id="newsletter" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#240046] via-[#45495f] to-[#240046] p-10 lg:p-16 border border-[rgba(240,72,133,0.25)]"
        >
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(240,72,133,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(154,170,175,0.2) 0%, transparent 50%)' }} />
          <div className="relative z-10 text-center">
            <span className="inline-block px-3 py-1 bg-[#F72585]/20 text-[#F72585] rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-[#F72585]/30">📬 Newsletter</span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-7xl text-[#f5f0e6] mb-6 leading-tight">Receba o essencial</h2>
            <p className="text-[#9AABAF] text-lg mb-10 max-w-xl mx-auto leading-relaxed">Dicas de estilo, saúde e desenvolvimento — direto para você. Sem spam, sem pressa.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => { e.preventDefault(); (e.target as HTMLFormElement).reset(); alert('Inscrição confirmada. Bem-vinda.'); }}>
              <input type="email" placeholder="Seu melhor e-mail" required className="flex-1 px-6 py-4 rounded-full bg-[#240046]/80 border border-[rgba(240,72,133,0.3)] text-[#f5f0e6] placeholder:text-[#9AABAF]/40 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all" />
              <button type="submit" className="btn-rosa px-8 py-4 rounded-full font-bold whitespace-nowrap">Quero Receber</button>
            </form>
            <p className="text-xs text-[#9AABAF]/50 mt-4">Você pode cancelar quando quiser. A gente também.</p>
          </div>
        </motion.div>
      </section>

      {/* === MONETIZAÇÃO — Produtos === */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">Para você</span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl text-[#f5f0e6] mt-2">Produtos & Parceiros</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "CleanOrder", desc: "Limpeza de estofados em 30 min", price: "R$29,90", tag: "Afiliado" },
            { name: "SaaS Base", desc: "Sistema simples de registro + Pix", price: "R$129,97", tag: "SaaS" },
            { name: "eBook Premium", desc: "2500+ palavras + 6 WebP por artigo", price: "R$47,90", tag: "Produto" },
            { name: "PLR + Drop", desc: "Conteúdo pronto para revender", price: "R$97,00", tag: "PLR" },
          ].map((p, i) => (
            <motion.a
              key={p.name}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group block p-6 rounded-2xl bg-[#45495f]/20 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/40 transition-all"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F72585]">{p.tag}</span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] mb-2 mt-1 group-hover:text-[#F72585] transition">{p.name}</h3>
              <p className="text-sm text-[#9AABAF]/80 mb-4 leading-relaxed">{p.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#F72585]">{p.price}</span>
                <span className="text-[#F72585] text-sm font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Ver →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* === BARRA DE PROGRESSO DE SCROLL === */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F72585] via-[#e85d8a] to-[#9AABAF] z-[100] origin-left" />

      {/* === INDICADOR DE HORA — TOQUE ÚNICO === */}
      <div className="fixed bottom-6 right-6 z-40 px-4 py-2 rounded-full bg-[#240046]/80 backdrop-blur border border-[#F72585]/30 text-[#9AABAF] text-xs font-mono hidden lg:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F72585] animate-pulse" />
        <span>{time || '...'}</span>
      </div>

<style jsx global>{`
@keyframes revealUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
@keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
@keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
.glass-card { background: rgba(36,0,70,0.65); backdrop-filter: blur(24px) saturate(140%); border: 1px solid rgba(240,72,133,0.12); border-radius: 1.5rem; }
.glass-card:hover { border-color: rgba(240,72,133,0.35); box-shadow: 0 8px 32px rgba(240,72,133,0.15); }
.glass-text { color: #9AABAF; text-shadow: 0 1px 0 rgba(255,255,255,0.05); }
.btn-rosa { background: linear-gradient(135deg, #F72585 0%, #e85d8a 100%); color: #fff; font-weight: 700; padding: 0.875rem 2rem; border-radius: 9999px; border: none; box-shadow: 0 8px 32px rgba(240,72,133,0.3); transition: all 0.3s ease; }
.btn-rosa:hover { box-shadow: 0 16px 48px rgba(240,72,133,0.5); transform: translateY(-2px); }
`}</style>
    </>
  );
}
