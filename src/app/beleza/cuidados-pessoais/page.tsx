import NewsCard from '@/components/NewsCard'
import { CUIDADOS_PESSOAIS } from '@/lib/mock-data'

export default function BelezaCuidados2026() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Cuidados Pessoais e Beleza na Primavera
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Rotinas de skincare e maquiagem para a nova estação
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CUIDADOS_PESSOAIS.map((cuidado) => (
            <NewsCard
              key={cuidado.slug}
              title={cuidado.title}
              excerpt={cuidado.excerpt}
              date={cuidado.date}
              image={cuidado.image}
              imageAlt={cuidado.imageAlt}
              slug={cuidado.slug}
              category={cuidado.category}
            />
          ))}
        </div>
      </div>
    </main>
  )
}