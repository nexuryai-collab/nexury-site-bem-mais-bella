import { CATEGORIAS } from '@/lib/artigos';

export const metadata = {
  title: 'Página não encontrada | Bem Mais Bella',
};

export default function NaoEncontrada() {
  return (
    <main className="min-h-[70vh] max-w-4xl mx-auto px-6 py-24 flex flex-col justify-center">
      <p className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">Erro 404</p>

      <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-7xl text-[#f5f0e6] mt-3 leading-none">
        Essa página saiu de cena.
      </h1>

      <p className="text-[#9AA4AF] mt-6 max-w-xl leading-relaxed text-lg">
        O endereço mudou, o link envelheceu, ou o conteúdo foi reorganizado. Nada se perdeu do
        acervo: use a busca ou entre por uma das categorias.
      </p>

      <form role="search" action="/busca" method="get" className="mt-9 flex gap-3 max-w-lg">
        <input
          type="search"
          name="q"
          placeholder="O que você procurava?"
          aria-label="Pesquisar no site"
          className="flex-1 px-6 py-4 rounded-full bg-[#45495f]/50 border border-[rgba(240,72,133,0.25)] text-[#f5f0e6] placeholder:text-[#9AA4AF]/50 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all"
        />
        <button type="submit" className="btn-rosa px-7 py-4 rounded-full font-bold whitespace-nowrap">
          Buscar
        </button>
      </form>

      <h2 className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold mt-14 mb-5">
        Ou comece por aqui
      </h2>
      <div className="flex flex-wrap gap-3">
        {CATEGORIAS.map(c => (
          <a
            key={c.slug}
            href={'/' + c.slug}
            className="px-5 py-2 rounded-full bg-[#45495f]/20 border border-[rgba(240,72,133,0.12)] text-sm text-[#9AA4AF] hover:text-[#F72585] hover:border-[#F72585]/40 transition"
          >
            {c.nome}
          </a>
        ))}
      </div>
    </main>
  );
}
