export default function AffiliatePage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-emerald-950 text-amber-50 px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-amber-400 hover:underline mb-6 inline-block">← Voltar ao Bem Mais Bella</a>
        <h1 className="text-5xl font-serif mb-8">Produto Afiliado</h1>
        <div className="bg-slate-900/60 border border-amber-900/30 p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-4">[Nome do Produto]</h2>
          <p className="text-slate-300 text-lg mb-6">Análise completa por Lillith Nogah. Se você comprar pelo nosso link, o site recebe uma comissão — sem custo extra para você.</p>
          <a href="#" className="inline-block px-10 py-5 bg-amber-600 hover:bg-amber-500 rounded-xl font-extrabold text-xl shadow-lg transition">Ver Oferta →</a>
        </div>
      </div>
    </main>
  );
}
