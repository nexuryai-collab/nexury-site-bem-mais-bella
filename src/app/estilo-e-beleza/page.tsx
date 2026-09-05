'use client';
import { motion } from 'framer-motion';
import KineticText from '../../components/KineticText';
import TiltCard from '../../components/TiltCard';
import Particles from '../../components/Particles';

const artigos = [
  { cat: "Moda", title: "Moda Sustentável: Como Vestir Bem Sem Perder a Alma", img: "/images/moda-consciente-2026/hero.webp", desc: "Guarda-roupa essencial, escolhas conscientes e estilo para todos os corpos.", author: "Lillith Nogah", read: "10 min", tag: "Moda Consciente" },
  { cat: "Beleza", title: "Skincare Inteligente: A Rotina Certa Para Cada Tipo de Pele", img: "/images/skincare-inteligente-2026/hero.webp", desc: "Limpeza, hidratação e proteção — os três pilares de uma pele saudável.", author: "Lillith Nogah", read: "8 min", tag: "Skincare" },
  { cat: "Maquiagem", title: "Maquiagem Consciente: Menos Produto, Mais Essência", img: "/images/maquiagem-consciente-2026/hero.webp", desc: "Técnicas simples para um visual natural e radiante todos os dias.", author: "Lillith Nogah", read: "9 min", tag: "Maquiagem" },
  { cat: "Cabelo", title: "Cabelo 2026: Tendências Que Respeitam a Textura e a Personalidade", img: "/images/cabelo-2026/hero.webp", desc: "De流水 a praia — cortes, cores e cuidados para cada estilo de vida.", author: "Lillith Nogah", read: "7 min", tag: "Cabelo" },
  { cat: "Acessórios", title: "Acessórios Sustentáveis: Como Montar Um Guarda-Roupa Atemporal", img: "/images/acessorios-sustentaveis-2026/hero.webp", desc: "Poucas peças, muitas possibilidades. A arte deAccessorizar com consciência.", author: "Lillith Nogah", read: "11 min", tag: "Acessórios" },
  { cat: "Tendências", title: "Brazilcore e Hype: As Tendências Que Vão Marcar 2026", img: "/images/brazilcore-hype-2026/hero.webp", desc: "Do funk ao streetwear — como incorporar o hype brasileiro no seu dia a dia.", author: "Lillith Nogah", read: "13 min", tag: "Tendências" },
];

const subcategorias = ["Moda","Beleza","Maquiagem","Cabelo","Acessórios","Tendências","Skincare","Slow Aging","Beleza Inclusiva","Beleza Caseira"];

export default function EstiloBelezaPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[70vh] overflow-hidden flex items-end">
        <Particles count={50} color="#F72585" />
        <img src="/images/moda-consciente-2026/hero.webp" alt="Estilo e Beleza" className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#240046] via-[#240046]/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 pt-48 w-full">
          <motion.span initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{delay:0.2}} className="inline-block px-3 py-1 bg-[#F72585]/20 text-[#F72585] rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 border border-[#F72585]/30">Estilo e Beleza</motion.span>
          <h1 className="font-[family-name:var(--font-cormorant)] text-6xl lg:text-8xl font-light text-[#f5f0e6] leading-[0.9] mb-6">
            <KineticText text="Estilo e Beleza" />
          </h1>
          <p className="text-xl text-[#9AA4AF] max-w-2xl">Moda, beleza, cuidados e autocuidado. Para a mulher que sabe que estilo é uma escolha — e toda escolha merece ser consciente.</p>
        </div>
      </section>

      {/* SUBCATEGORIAS */}
      <section className="bg-[#1a0a2e] py-6 overflow-hidden border-y border-[rgba(240,72,133,0.1)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {subcategorias.map((s, i) => (
              <motion.a key={s} href="#" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} transition={{delay:i*0.05}} className="flex-shrink-0 px-5 py-2 rounded-full bg-[#45495f]/60 text-[#9AA4AF] border border-[rgba(240,72,133,0.15)] hover:border-[#F72585] hover:text-[#F72585] transition-all text-sm font-medium">{s}</motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* GRID DE ARTIGOS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl text-[#f5f0e6]">Moda e Beleza</h2>
          <a href="#" className="text-[#F72585] hover:text-[#f08eb0] transition text-sm font-medium">Ver todos →</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {artigos.map((a, i) => (
            <TiltCard key={i}>
              <motion.a
                href="#"
                initial={{ opacity:0, y:40 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.6, delay:i*0.08 }}
                whileHover={{ y:-6 }}
                className="group block rounded-2xl overflow-hidden bg-[#45495f]/20 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/50 transition-all"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#240046] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#240046]/90 backdrop-blur text-[#F72585] text-[10px] font-bold uppercase tracking-wider rounded-full">{a.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] leading-tight mb-3 group-hover:text-[#F72585] transition-colors">{a.title}</h3>
                  <p className="text-[#9AA4AF]/80 text-sm leading-relaxed mb-4">{a.desc}</p>
                  <div className="flex items-center justify-between text-xs text-[#9AA4AF]/60">
                    <span>Por <strong className="text-[#F72585]">{a.author}</strong></span>
                    <span>⏱ {a.read}</span>
                  </div>
                </div>
              </motion.a>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* CITAÇÃO LILLITH */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{duration:0.8}}>
          <span className="text-6xl text-[#F72585] font-serif">"</span>
          <p className="font-[family-name:var(--font-cormorant)] text-3xl text-[#f5f0e6] italic leading-relaxed my-6">Estilo não é sobre seguir tendências. É sobre saber quem você é — e vestir essa verdade com coragem.</p>
          <span className="text-[#F72585] text-sm font-bold uppercase tracking-[0.3em]">— Lillith Nogah</span>
        </motion.div>
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#240046] to-[#45495f] p-10 lg:p-14 border border-[rgba(240,72,133,0.2)]">
          <div className="relative z-10 text-center">
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl lg:text-6xl text-[#f5f0e6] mb-4">Receba o Essencial</h2>
            <p className="text-[#9AA4AF] mb-8 max-w-xl mx-auto">Dicas de estilo e beleza — direto para você. Sem spam.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => { e.preventDefault(); (e.target as HTMLFormElement).reset(); alert('Inscrição confirmada.'); }}>
              <input type="email" placeholder="Seu melhor e-mail" required className="flex-1 px-6 py-4 rounded-full bg-[#240046]/80 border border-[rgba(240,72,133,0.3)] text-[#f5f0e6] placeholder:text-[#9AA4AF]/40 focus:outline-none focus:border-[#F72585] transition-all" />
              <button type="submit" className="btn-rosa px-8 py-4 rounded-full font-bold whitespace-nowrap">Quero Receber</button>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
}
