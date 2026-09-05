// Componente RelatedContent — artigos relacionados
export default function RelatedContent() {
  return (
    <section className="my-12 p-6 rounded-2xl border border-[rgba(240,72,133,0.2)] bg-[rgba(36,0,70,0.05)] backdrop-blur-xl">
      <h3 className="text-2xl font-serif mb-6 text-[#9AA4AF]">Leituras Relacionadas</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {[1,2,3].map(i => (
          <a key={i} href="#" className="block p-4 rounded-xl bg-[#45495f]/60 hover:bg-[#240046] transition border border-[rgba(240,72,133,0.15)]">
            <h4 className="font-semibold text-[#F72585] mb-2">Artigo Relacionado {i}</h4>
            <p className="text-sm text-[#9AA4AF]/80">Descubra mais conteúdo sobre o tema que te interessa.</p>
          </a>
        ))}
      </div>
    </section>
  );
}