import { Reveal, TituloRevelado } from '@/components/Motion';
import { FundoSecao } from '@/components/FundoTematico';

export const metadata = {
  title: 'Ferramentas | Bem Mais Bella',
  description:
    'Ferramentas que terminam em decisao, nao em artigo: diagnostico de negocio, quiz de estilo e busca no acervo.',
};

/**
 * Hub de Ferramentas.
 *
 * A regra desta pagina: so entra o que ja funciona. Uma lista de doze
 * ferramentas com onze delas escritas "em breve" nao e um roadmap para a
 * leitora, e uma promessa. O que ainda nao existe fica no vault, nao aqui.
 */

const PRONTAS = [
  {
    url: '/ferramentas/diagnostico',
    nome: 'Diagnostico Empreendedor',
    resumo:
      'Seis perguntas sobre o seu tempo, o seu dinheiro e o que voce ja sabe fazer. No fim, um plano na ordem certa e uma lista do que nao fazer ainda.',
    tempo: '3 minutos',
    para: 'Quem quer comecar, ou ja comecou e nao sabe qual e o proximo passo',
  },
  {
    url: '/#quiz',
    nome: 'Quiz de Estilo e Proposito',
    resumo:
      'Tres perguntas que apontam a area do site que mais tem a ver com o seu momento. Cada resultado leva para uma categoria que existe e tem materia publicada.',
    tempo: '1 minuto',
    para: 'Quem chegou agora e nao sabe por onde comecar a ler',
  },
  {
    url: '/busca',
    nome: 'Busca no acervo',
    resumo:
      'Procura por palavra em todos os artigos publicados, com filtro por area. Funciona offline depois do primeiro carregamento.',
    tempo: 'imediato',
    para: 'Quem ja sabe o que procura',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20">
        <FundoSecao slug="desenvolvimento-pessoal" />
        <div className="relative max-w-5xl mx-auto px-6">
          <Reveal>
            <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
              Faca, nao so leia
            </span>
          </Reveal>
          <TituloRevelado
            texto="Ferramentas"
            as="h1"
            className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl text-[#f5f0e6] mt-2"
          />
          <Reveal delay={0.1}>
            <p className="text-[#9AA4AF] text-lg mt-5 max-w-2xl leading-relaxed">
              Ler um artigo termina no fim do artigo. Estas paginas terminam numa decisao: o que
              fazer primeiro, por onde comecar, o que procurar.
            </p>
            <p className="text-[#9AA4AF]/55 text-sm mt-4 max-w-2xl leading-relaxed">
              Todas rodam no seu navegador. Nenhuma pede cadastro, e-mail ou pagamento, e nenhuma
              envia o que voce responde para lugar nenhum.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {PRONTAS.map(f => (
            <a
              key={f.url}
              href={f.url}
              className="group flex flex-col p-6 rounded-2xl bg-[#45495f]/15 border border-[rgba(240,72,133,0.12)] hover:border-[#F72585]/50 hover:bg-[#45495f]/25 hover:-translate-y-1 transition-all duration-500"
            >
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#F72585]">
                {f.tempo}
              </span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] mt-2 leading-tight group-hover:text-[#F72585] transition-colors">
                {f.nome}
              </h2>
              <p className="text-[#9AA4AF]/85 text-sm mt-3 leading-relaxed flex-1">{f.resumo}</p>
              <p className="text-[#9AA4AF]/55 text-xs mt-4 pt-4 border-t border-[rgba(240,72,133,0.1)]">
                Para: {f.para}
              </p>
            </a>
          ))}
        </div>

        <Reveal>
          <p className="text-[#9AA4AF]/60 text-sm mt-12 max-w-2xl leading-relaxed">
            Esta pagina lista o que ja esta pronto. Quando uma ferramenta nova estiver funcionando
            de verdade, ela aparece aqui — nunca antes.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
