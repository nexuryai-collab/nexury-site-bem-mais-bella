import { Reveal, TituloRevelado } from '@/components/Motion';
import { FundoSecao } from '@/components/FundoTematico';
import { ofertasComerciais } from '@/lib/ofertas';
import { areaDe } from '@/lib/taxonomia';

export const metadata = {
  title: 'Compras e Recomendações | Bem Mais Bella',
  description:
    'Achadinhos, comparativos e reviews. So entra produto realmente testado, e link de afiliado e identificado no proprio texto.',
};

/**
 * A vitrine.
 *
 * O encanamento esta pronto: os itens vem de `src/lib/ofertas.ts`, e quando
 * houver produto proprio ou achadinho para indicar, ele aparece aqui, no fim
 * dos artigos da area certa e em qualquer outro lugar que use a mesma lista —
 * sem ninguem editar pagina nenhuma.
 *
 * Enquanto nao houver, a pagina diz que nao ha. Vitrine com produto de mentira
 * para "nao ficar vazia" e o comeco do fim da confianca que o resto do site
 * passou meses construindo.
 */
export default function Page() {
  const itens = ofertasComerciais();
  const area = areaDe('compras');

  return (
    <main className="min-h-screen">
      <section className="relative py-20">
        <FundoSecao slug="estilo-de-vida" />
        <div className="relative max-w-5xl mx-auto px-6">
          <Reveal>
            <nav className="text-xs uppercase tracking-[0.2em] text-[#9AA4AF]/60 mb-4 flex flex-wrap gap-2">
              <a href="/" className="hover:text-[#F72585] transition">Inicio</a>
              <span>/</span>
              <span className="text-[#F72585]">Compras</span>
            </nav>
          </Reveal>
          <TituloRevelado
            texto="Compras e Recomendações"
            as="h1"
            className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl text-[#f5f0e6]"
          />
          <Reveal delay={0.1}>
            <p className="text-[#9AA4AF] text-lg mt-5 max-w-2xl leading-relaxed">
              Achadinhos, comparativos e reviews — de coisas que alguém daqui usou de verdade.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        {itens.length ? (
          <div className="grid md:grid-cols-3 gap-5">
            {itens.map(o => (
              <a
                key={o.id}
                href={o.url}
                className="group flex flex-col p-6 rounded-2xl bg-[#45495f]/15 border border-[rgba(240,72,133,0.12)] hover:border-[#F72585]/50 hover:-translate-y-1 transition-all duration-500"
              >
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#F72585]">
                  {o.chapeu}
                </span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6] mt-2 leading-tight group-hover:text-[#F72585] transition-colors">
                  {o.nome}
                </h2>
                <p className="text-[#9AA4AF]/85 text-sm mt-3 leading-relaxed flex-1">{o.resumo}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-[rgba(240,72,133,0.1)]">
                  <span className="text-[#F72585] text-sm font-bold">{o.acao}</span>
                  {typeof o.preco === 'number' ? (
                    <span className="text-[#f5f0e6] text-sm tabular-nums">
                      R$ {o.preco.toFixed(2).replace('.', ',')}
                    </span>
                  ) : null}
                </div>
                {o.afiliado ? (
                  <span className="text-[#9AA4AF]/50 text-[11px] mt-3">
                    Link de afiliado — o site recebe comissão, você não paga a mais.
                  </span>
                ) : null}
              </a>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-3xl border border-[rgba(240,72,133,0.18)] bg-[#45495f]/15 p-8 md:p-10 max-w-3xl">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#f5f0e6]">
                Ainda não temos nada para indicar
              </h2>
              <p className="text-[#9AA4AF] mt-4 leading-relaxed">{area?.vazia}</p>
              <p className="text-[#9AA4AF]/70 text-sm mt-5 leading-relaxed">
                Enquanto isso, o que existe aqui de mais útil é gratuito:
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="/ferramentas/diagnostico"
                  className="btn-rosa px-6 py-3 rounded-full font-bold text-sm"
                >
                  Diagnóstico Empreendedor
                </a>
                <a
                  href="/ferramentas"
                  className="px-6 py-3 rounded-full bg-[#45495f]/30 border border-[rgba(240,72,133,0.2)] text-sm text-[#9AA4AF] hover:text-[#F72585] hover:border-[#F72585]/50 transition"
                >
                  Todas as ferramentas
                </a>
              </div>
            </div>
          </Reveal>
        )}

        {area?.regra ? (
          <Reveal>
            <p className="text-[#9AA4AF]/55 text-sm mt-10 max-w-2xl leading-relaxed">
              <strong className="text-[#9AA4AF]/80">Como escolhemos:</strong> {area.regra}{' '}
              <a href="/politica-editorial" className="text-[#F72585] hover:underline">
                Política editorial
              </a>
            </p>
          </Reveal>
        ) : null}
      </section>
    </main>
  );
}
