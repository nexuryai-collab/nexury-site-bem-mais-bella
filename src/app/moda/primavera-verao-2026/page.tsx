import NewsCard from '@/components/NewsCard'
import { TENDENCIAS_PRIMAVERA_VERAO } from '@/lib/mock-data'

export default function ModaPrimaveraVerao2026() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Moda Primavera/Verão 2026
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            As tendências que todo mulher deve conhecer nesta estação
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TENDENCIAS_PRIMAVERA_VERAO.map((tendencia) => (
            <NewsCard
              key={tendencia.slug}
              title={tendencia.title}
              excerpt={tendencia.excerpt}
              date={tendencia.date}
              image={tendencia.image}
              imageAlt={tendencia.imageAlt}
              slug={tendencia.slug}
              category={tendencia.category}
            />
          ))}
        </div>
      </div>
    </main>
  )
}