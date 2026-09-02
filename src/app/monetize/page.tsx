export default function Monetizar() {
  return (
    <main className="min-h-screen bg-black text-amber-50 px-8 py-20">
      <h1 className="text-5xl font-serif text-center mb-4">Trabalhe com Lillith Nogah</h1>
      <p className="text-center text-xl mb-12 max-w-2xl mx-auto">Plataforma de empoderamento feminino — 8 categorias, conteúdo patrocinado, newsletter, anúncios.</p>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-slate-900 border border-amber-900/40 p-8 rounded-xl"><h2 className="text-2xl font-bold mb-4">Artigos Patrocinados</h2><p className="text-slate-400">R$ 350-800 por artigo. Inclui SEO, redes sociais e newsletter.</p></div>
        <div className="bg-slate-900 border border-amber-900/40 p-8 rounded-xl"><h2 className="text-2xl font-bold mb-4">Banner Hero</h2><p className="text-slate-400">R$ 500/mês. Destaque permanente na página inicial.</p></div>
        <div className="bg-slate-900 border border-amber-900/40 p-8 rounded-xl"><h2 className="text-2xl font-bold mb-4">Newsletter</h2><p className="text-slate-400">R$ 200/envio. Alcance 8.000+ mulheres engajadas.</p></div>
      </div>
      <div className="text-center mt-16"><a href="#" className="inline-block px-10 py-4 bg-amber-600 hover:bg-amber-500 rounded font-extrabold text-xl">Falar com Lillith</a></div>
      <div className="text-center mt-20 text-amber-200/60"><h3 className="text-2xl font-bold mb-2">Meta: R$ 2.000 até 30/11</h3><p>Junte-se ao Bem Mais Bella e faça parte do crescimento.</p></div>
    </main>
  );
}
