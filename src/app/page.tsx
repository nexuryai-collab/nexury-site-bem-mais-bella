import NewsCard from '@/components/NewsCard'
import { NOTICIAS_MOCK } from '@/lib/mock-data'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Bem Mais Bella - Notícias
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Fique por dentro das últimas tendências, dicas e oportunidades para mulheres
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NOTICIAS_MOCK.map((noticia) => (
            <NewsCard
              key={noticia.slug}
              title={noticia.title}
              excerpt={noticia.excerpt}
              date={noticia.date}
              image={noticia.image}
              imageAlt={noticia.imageAlt}
              slug={noticia.slug}
              category={noticia.category}
            />
          ))}
        </div>
      </div>
    </main>
  )
}