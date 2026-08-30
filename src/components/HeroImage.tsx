import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroImageProps {
  src: string
  alt: string
  title: string
  subtitle?: string
  className?: string
}

export default function HeroImage({
  src,
  alt,
  title,
  subtitle,
  className,
}: HeroImageProps) {
  return (
    <div className={cn("relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        priority
        quality={90}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
      <div className="absolute bottom-8 left-8 right-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white max-w-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-lg text-white/80 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}