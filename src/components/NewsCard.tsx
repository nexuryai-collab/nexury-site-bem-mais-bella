import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NewsCardProps {
  title: string
  excerpt: string
  date: string
  image: string
  imageAlt: string
  slug: string
  category: string
}

export default function NewsCard({
  title,
  excerpt,
  date,
  image,
  imageAlt,
  slug,
  category,
}: NewsCardProps) {
  return (
    <article className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Imagem otimizada com lazy load */}
      <div className="relative aspect-video">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          placeholder="blur"
          blurDataURL={image.replace('/large', '/small')} // fallback simples
          className="object-cover"
          priority={false} // Cloudflare cuida do cache
          quality={85}
        />
        {/* Badge de categoria */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 sm:p-6">
        <time className="text-xs text-slate-500 dark:text-slate-400">
          {new Date(date).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </time>

        <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
          <Link href={`/noticias/${slug}`}>
            {title}
          </Link>
        </h2>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {excerpt}
        </p>

        <Link
          href={`/noticias/${slug}`}
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  )
}