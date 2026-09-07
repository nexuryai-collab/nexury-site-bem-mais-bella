import { ofertaPara } from '@/lib/ofertas';

/**
 * O bloco de oferta no fim do artigo.
 *
 * E o ponto onde a leitora que veio pelo conteudo pode virar cliente, e por
 * isso ele obedece a duas regras que valem mesmo quando houver produto pago:
 *
 * - **A oferta e escolhida pela area do texto**, nao pela margem. Quem acabou
 *   de ler sobre financas recebe a ferramenta de diagnostico; quem leu sobre
 *   moda recebe outra coisa.
 * - **Link de afiliado se identifica sozinho.** O aviso sai do dado, nao da
 *   memoria de quem escreveu — a promessa de transparencia da Sobre Nos nao
 *   pode depender de alguem lembrar de escrever "contem link pago".
 */
export default function Oferta({ areaSlug }: { areaSlug: string }) {
  const o = ofertaPara(areaSlug);
  if (!o) return null;

  return (
    <aside className="max-w-3xl mx-auto px-6 pb-4">
      <div className="relative overflow-hidden rounded-3xl border border-[rgba(240,72,133,0.22)] bg-[#45495f]/20 p-8">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-16 w-64 h-64 rounded-full blur-3xl"
          style={{ background: '#F72585', opacity: 0.12 }}
        />
        <div className="relative">
          <span className="text-[#F72585] text-[11px] uppercase tracking-[0.28em] font-bold">
            {o.chapeu}
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#f5f0e6] mt-2 leading-tight">
            {o.nome}
          </h2>
          <p className="text-[#9AA4AF] mt-3 leading-relaxed">{o.resumo}</p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <a href={o.url} className="btn-rosa px-7 py-3 rounded-full font-bold text-sm">
              {o.acao}
            </a>
            {typeof o.preco === 'number' ? (
              <span className="text-[#f5f0e6] text-sm tabular-nums">
                R$ {o.preco.toFixed(2).replace('.', ',')}
              </span>
            ) : null}
          </div>

          {o.afiliado || o.tipo === 'achadinho' ? (
            <div className="mt-6 pt-5 border-t border-[rgba(240,72,133,0.12)] space-y-2">
              {o.oque ? (
                <p className="text-[#9AA4AF]/70 text-xs leading-relaxed">
                  <strong className="text-[#9AA4AF]">O que é:</strong> {o.oque}. As promessas de
                  resultado são do fabricante, não nossas.
                </p>
              ) : null}
              <p className="text-[#9AA4AF]/70 text-xs leading-relaxed">
                <strong className="text-[#9AA4AF]">
                  {o.testado ? 'Testado por aqui.' : 'Não testamos este produto.'}
                </strong>{' '}
                {o.testado
                  ? 'Alguém do Bem Mais Bella usou antes de indicar.'
                  : 'É uma indicação, não uma recomendação de uso. Quando alguém daqui testar, esta linha muda.'}
              </p>
              {o.afiliado ? (
                <p className="text-[#9AA4AF]/55 text-xs leading-relaxed">
                  Link de afiliado: se você comprar, o Bem Mais Bella recebe comissão, sem custo a
                  mais para você. A comissão não muda o que a gente escreve.
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
