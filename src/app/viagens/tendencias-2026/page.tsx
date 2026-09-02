import NewsCard from '@/components/NewsCard'
import { VIAGENS } from '@/lib/mock-data'

export default function ViagensTendencias2026() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Viagens e Tendências Primavera/Verão 2026
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Destinos imperdíveis e dicas de estilo para suas férias
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIAGENS.map((viagem) => (
            <NewsCard
              key={viagem.slug}
              title={viagem.title}
              excerpt={viagem.excerpt}
              date={viagem.date}
              image={viagem.image}
              imageAlt={viagem.imageAlt}
              slug={viagem.slug}
              category={viagem.category}
            />
          ))}
        </div>
      </div>
    </main>
  )
}