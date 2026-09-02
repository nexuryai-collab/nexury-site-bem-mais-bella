export default function HomePremium() {
  return (
    <>
      {/* Hero com parallax e movimento */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden noise">
        <img src="https://images.unsplash.com/photo-1515886657613-8f3815ba2a67?w=1400&h=900&fit=crop&q=85" alt="Lillith" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight">
            <span className="gradient-text">Bem Mais Bella</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 font-light">Estilo · Saúde · Maternidade · Carreira · Propósito</p>
          <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">Conteúdo editorial de alta qualidade por Lillith Nogah. Descubra, cresça, transforme.</p>
          <div className="mt-10 flex gap-4 justify-center">
            <a href="#explore" className="btn-premium">Explorar Conteúdo</a>
            <a href="/monetize" className="px-8 py-4 rounded-full border border-amber-600/40 text-amber-400 hover:bg-amber-600/10 transition">Anuncie Aqui</a>
          </div>
        </div>
      </section>

      {/* Seções Populares — Grid Premium */}
      <section id="explore" className="py-24">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">O Que Você Busca Hoje?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {t:"Estilo e Beleza",d:"Moda, beleza, cuidados e tendências"},
            {t:"Saúde e Bem-Estar",d:"Nutrição, fitness, saúde mental"},
            {t:"Maternidade e Família",d:"Gravidez, filhos, vida em família"},
            {t:"Carreira e Finanças",d:"Empreendedorismo, investimentos"},
            {t:"Casamentos",d:"Planejamento, cerimônias, inspiração"},
            {t:"Relacionamentos",d:"Conexão, crescimento, amor em ação"},
            {t:"Estilo de Vida",d:"Viagens, decoração, gastronomia"},
            {t:"Desenvolvimento",d:"Autoconhecimento, propósito, espiritualidade"},
          ].map(card => (
            <a key={card.t} href="#" className="glass-card p-8 text-center hover:scale-[1.02] transition-transform">
              <h3 className="text-xl font-serif font-bold mb-3">{card.t}</h3>
              <p className="text-sm text-slate-400">{card.d}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Destaques e Novidades — 2 colunas com imagens */}
      <section className="grid md:grid-cols-2 gap-10 mb-24">
        <a href="#" className="glass-card overflow-hidden group relative h-[500px] block">
          <img src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=800&h=600&fit=crop&q=80" alt="Estilo" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <span className="text-xs uppercase tracking-widest text-amber-400 mb-2 block">Destaque</span>
            <h3 className="text-3xl font-serif font-bold">Estilo e Beleza</h3>
            <p className="text-slate-400 mt-2">Moda consciente, cuidados e tendências.</p>
          </div>
        </a>
        <a href="#" className="glass-card overflow-hidden group relative h-[500px] block">
          <img src="https://images.unsplash.com/photo-1521791136064-7986c2920218?w=800&h=600&fit=crop&q=80" alt="Carreira" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <span className="text-xs uppercase tracking-widest text-amber-400 mb-2 block">Novidade</span>
            <h3 className="text-3xl font-serif font-bold">Carreira e Finanças</h3>
            <p className="text-slate-400 mt-2">Investimentos simples e empreendedorismo.</p>
          </div>
        </a>
      </section>

      {/* Quiz / Propósito */}
      <section className="text-center py-20 mb-24 bg-gradient-to-r from-amber-900/10 via-slate-900/20 to-emerald-950/20 rounded-3xl border border-amber-900/20">
        <h2 className="text-4xl md:text-6xl font-serif mb-6">Descubra Seu Estilo e Propósito</h2>
        <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto">Em 5 perguntas, encontre conteúdo personalizado para o seu momento atual.</p>
        <a href="#" className="btn-premium text-lg">Fazer o Quiz →</a>
      </section>

      {/* Para Você — Personalizado */}
      <section className="mb-24">
        <h2 className="text-4xl font-serif text-center mb-12">Para Você</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <a href="#" className="glass-card p-8 block hover:-translate-y-2 transition-transform">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&q=80" alt="Bem-estar" className="w-full h-48 object-cover rounded-xl mb-4 opacity-80" />
            <h4 className="text-xl font-serif font-bold mb-2">Saúde e Bem-Estar</h4>
            <p className="text-sm text-slate-400">Nutrição, mindfulness, autocuidado diário.</p>
          </a>
          <a href="#" className="glass-card p-8 block hover:-translate-y-2 transition-transform">
            <img src="https://images.unsplash.com/photo-1515886657613-8f3815ba2a67?w=600&h=400&fit=crop&q=80" alt="Moda" className="w-full h-48 object-cover rounded-xl mb-4 opacity-80" />
            <h4 className="text-xl font-serif font-bold mb-2">Moda e Estilo</h4>
            <p className="text-sm text-slate-400">Tendências, guarda-roupa essencial, moda consciente.</p>
          </a>
          <a href="#" className="glass-card p-8 block hover:-translate-y-2 transition-transform">
            <img src="https://images.unsplash.com/photo-1515886657613-8f3815ba2a67?w=600&h=400&fit=crop&q=80" alt="Família" className="w-full h-48 object-cover rounded-xl mb-4 opacity-80" />
            <h4 className="text-xl font-serif font-bold mb-2">Maternidade</h4>
            <p className="text-sm text-slate-400">Gravidez, pós-parto, rotina com bebê, autoestima.</p>
          </a>
        </div>
      </section>

      {/* Junte-se à Comunidade */}
      <section className="text-center py-16 mb-8">
        <h2 className="text-5xl font-serif mb-6">Junte-se à Comunidade</h2>
        <p className="text-xl text-slate-300 mb-8">Fóruns, blogs de convidadas, eventos, desafios mensais — cresça com a gente.</p>
        <a href="/comunidade" className="btn-premium">Entrar →</a>
      </section>
    </>
  )
}
