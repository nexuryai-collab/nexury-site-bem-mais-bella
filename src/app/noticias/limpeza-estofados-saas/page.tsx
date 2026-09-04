export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-[#f5f0e6]">
      <h1 className="font-[var(--font-cormorant)] text-4xl lg:text-6xl text-[#F72585] mb-4">S.o.S Interni Puri</h1>
      <p className="text-xl text-[#9AABAF] mb-8">SaaS de Limpeza de Estofados no Brasil — Modelo Acessível.</p>
      <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57b?auto=format&fit=crop&w=800&q=80" alt="Mulher estilo premium" className="w-full rounded-2xl shadow-2xl mb-8" />
      <h2 className="text-2xl font-bold mb-4">Preços</h2>
      <ul className="list-disc pl-5 space-y-2 text-[#9AABAF]">
        <li>Base: R$129,97</li>
        <li>Médio: R$329,97</li>
        <li>Enterprise: R$397,97</li>
      </ul>
      <p className="mt-8 text-sm text-[#9AABAF]/60">Fonte: Next.js custom page. Imagem substituída.</p>
    </main>
  );
}
