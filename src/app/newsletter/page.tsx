import { Reveal, TituloRevelado } from '@/components/Motion';
import { FundoSecao } from '@/components/FundoTematico';

export const metadata = {
  title: 'Newsletter | Bem Mais Bella',
  description:
    'A newsletter do Bem Mais Bella ainda nao esta aberta. Enquanto isso, o acervo inteiro esta no ar e e gratuito.',
};

/**
 * Newsletter — fechada, e dizendo isso.
 *
 * O que existia aqui era um formulario que esperava um segundo e meio e
 * respondia "Enviado com sucesso! Verifique seu e-mail" sem enviar nada para
 * lugar nenhum. Mandava a leitora esperar um e-mail que nunca ia chegar, e
 * descartava o endereco dela.
 *
 * Isso e duas coisas ao mesmo tempo: engano com quem confiou, e coleta de dado
 * pessoal sem finalidade nem destino — exatamente o que a LGPD trata. Um site
 * que promete na Sobre Nos "numero so com fonte" nao pode ter um formulario que
 * mente na propria caixa de entrada.
 *
 * Enquanto nao houver servico de e-mail ligado, a pagina diz que a newsletter
 * nao esta aberta e manda a leitora para o que existe. No dia em que houver, o
 * formulario volta — funcionando.
 */
export default function Page() {
  return (
    <main className="min-h-screen">
      <section className="relative py-24">
        <FundoSecao slug="historias-inspiradoras" />
        <div className="relative max-w-3xl mx-auto px-6">
          <Reveal>
            <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
              Ainda não aberta
            </span>
          </Reveal>
          <TituloRevelado
            texto="A newsletter vem depois"
            as="h1"
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl text-[#f5f0e6] mt-2 leading-tight"
          />
          <Reveal delay={0.1}>
            <p className="text-[#9AA4AF] text-lg mt-6 leading-relaxed">
              A gente prefere não pedir o seu e-mail antes de ter para onde mandá-lo. Quando a
              newsletter existir de verdade, ela aparece aqui — e você decide se quer.
            </p>
            <p className="text-[#9AA4AF]/70 mt-5 leading-relaxed">
              Enquanto isso, o acervo inteiro está no ar, é gratuito e não pede cadastro nenhum
              para ser lido.
            </p>

            <div className="flex flex-wrap gap-3 mt-9">
              <a href="/em-alta" className="btn-rosa px-7 py-3 rounded-full font-bold text-sm">
                Ver o que está em alta
              </a>
              <a
                href="/ferramentas/diagnostico"
                className="px-7 py-3 rounded-full bg-[#45495f]/30 border border-[rgba(240,72,133,0.2)] text-sm text-[#9AA4AF] hover:text-[#F72585] hover:border-[#F72585]/50 transition"
              >
                Fazer o diagnóstico
              </a>
              <a
                href="/busca"
                className="px-7 py-3 rounded-full bg-[#45495f]/30 border border-[rgba(240,72,133,0.2)] text-sm text-[#9AA4AF] hover:text-[#F72585] hover:border-[#F72585]/50 transition"
              >
                Buscar no acervo
              </a>
            </div>

            <p className="text-[#9AA4AF]/50 text-xs mt-12 leading-relaxed border-t border-[rgba(240,72,133,0.12)] pt-6">
              Por que esta página não tem formulário: enquanto não existir um serviço de envio
              ligado, um campo de e-mail aqui só serviria para coletar um dado sem destino. O
              critério está na{' '}
              <a href="/politica-editorial" className="text-[#F72585] hover:underline">
                política editorial
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
