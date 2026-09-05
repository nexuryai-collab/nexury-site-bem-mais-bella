import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0f051a] text-[#f5f0e6] px-8 py-20 max-w-3xl mx-auto">
      <Link href="/" className="text-[#F72585] text-sm mb-8 inline-block">← Voltar</Link>
      <h1 className="font-[family-name:var(--font-cormorant)] text-5xl text-[#f5f0e6] mb-6">Scent Stacking Brasil 2026</h1>
      <article className="prose prose-lg text-[#9AABAF] leading-relaxed">
        <p>Artigo completo disponível na versão publicada.</p>
      </article>
    </main>
  )
}
