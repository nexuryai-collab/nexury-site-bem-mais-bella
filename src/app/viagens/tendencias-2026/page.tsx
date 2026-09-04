const destinos = [
  'Destinos da Temporada',
  'Dicas para Mulheres Viajantes',
  'Roteiros Culturais e Sustentáveis',
  'Viagens Adaptadas e Acessíveis'
];

const tendencias = [
  {
    titulo: 'Viagens com propósito',
    descricao: 'Roteiros que combinam descanso, cultura, bem-estar e experiências com significado.'
  },
  {
    titulo: 'Destinos sustentáveis',
    descricao: 'Escolhas mais conscientes para viajar respeitando comunidades locais e o meio ambiente.'
  },
  {
    titulo: 'Experiências acessíveis',
    descricao: 'Viagens pensadas para diferentes corpos, idades, ritmos e necessidades.'
  },
  {
    titulo: 'Roteiros para mulheres',
    descricao: 'Dicas práticas para viajar com mais autonomia, segurança, leveza e confiança.'
  }
];

export default function TendenciasViagensPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-zinc-900">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">
          Estilo de Vida · Viagens
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-zinc-950 md:text-6xl">
          Tendências de viagens para viver experiências com mais propósito
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700">
          Ideias, destinos e inspirações para mulheres que desejam viajar com mais
          consciência, segurança, beleza, conexão e liberdade.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {destinos.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-zinc-950">{item}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {tendencias.map((item) => (
            <article
              key={item.titulo}
              className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-zinc-950">{item.titulo}</h2>
              <p className="mt-4 leading-7 text-zinc-700">{item.descricao}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
