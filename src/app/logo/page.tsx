import Image from 'next/image'

export default function LogoPage() {
  return (
    <main className="min-h-screen bg-[#2d0a3d] flex flex-col items-center justify-center p-8">
      <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
        <Image
          src="/images/logo-bem-mais-bella.png"
          alt="Bem Mais Bella — Logo"
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="text-white text-3xl md:text-5xl font-serif mt-8 tracking-[0.2em]">BEM MAIS BELLA</h1>
      <p className="text-white/70 text-lg mt-2 tracking-wide">Estilo. Propósito. Consciência.</p>
      <a href="/" className="mt-8 px-6 py-3 bg-white text-[#2d0a3d] rounded-full font-medium hover:bg-white/90 transition">Ir para o site →</a>
    </main>
  )
}