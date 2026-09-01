import Link from 'next/link'
import { notícias } from '@/lib/mock-data'

export const metadata = {
  title: 'Viagens | Bem Mais Bella',
  description: 'Dicas de viagens para mulheres viajantes, destinos, roteiros e segurança',
}

export default function ViagensPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Viagens</h1>
      <p className="text-gray-600 mb-8">
        Destinos, dicas para mulheres viajantes, roteiros culturais e viagens acessíveis.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notícias.map((notícia) => (
          <article key={notícia.id} className="border rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/noticias/${notícia.slug}`}>{notícia.título}</Link>
            </h2>
            <p className="text-gray-600 mb-4">{notícia.resumo}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{notícia.categoria}</span>
              <span>{notícia.data}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}