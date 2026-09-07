import ParaVoce from '@/components/home/ParaVoce';
import VoceEstavaLendo from '@/components/VoceEstavaLendo';
import { Reveal, TituloRevelado } from '@/components/Motion';
import { FundoSecao } from '@/components/FundoTematico';

export const metadata = {
  title: 'Para Você | Bem Mais Bella',
  description:
    'O que o site guardou de voce — e onde ele guardou. Recomendacoes a partir do que voce leu, tudo dentro do seu proprio navegador.',
};

/**
 * "Para Voce" como pagina, nao so como bloco da home.
 *
 * A personalizacao aqui e honesta e por isso a pagina explica o mecanismo antes
 * de mostrar o resultado: tudo vem do `localStorage` deste navegador. Nao ha
 * conta, perfil, cookie de rastreio nem servidor guardando nada. Quem limpa os
 * dados do navegador zera isto, e a pagina diz como fazer.
 */
export default function Page() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20">
        <FundoSecao slug="desenvolvimento-pessoal" />
        <div className="relative max-w-5xl mx-auto px-6">
          <Reveal>
            <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
              Só neste navegador
            </span>
          </Reveal>
          <TituloRevelado
            texto="Para Você"
            as="h1"
            className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl text-[#f5f0e6] mt-2"
          />
          <Reveal delay={0.1}>
            <p className="text-[#9AA4AF] text-lg mt-5 max-w-2xl leading-relaxed">
              Conforme você lê, o site vai entendendo por onde você anda e sugerindo o que faz
              sentido em seguida.
            </p>
            <p className="text-[#9AA4AF]/55 text-sm mt-4 max-w-2xl leading-relaxed">
              Isso acontece inteiro dentro do seu navegador. Não existe conta, não existe perfil
              nosso sobre você, e nada disso é enviado para servidor nenhum — nem para o nosso.
              Limpar os dados do site no navegador apaga tudo, na hora.
            </p>
          </Reveal>
        </div>
      </section>

      <VoceEstavaLendo />

      <ParaVoce />

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="rounded-3xl border border-[rgba(240,72,133,0.15)] bg-[#45495f]/12 p-8 max-w-3xl">
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[#f5f0e6]">
              Quer recomeçar do zero?
            </h2>
            <p className="text-[#9AA4AF] text-sm mt-3 leading-relaxed">
              Se as sugestões não parecem mais com você, dois caminhos rápidos: refazer o{' '}
              <a href="/#quiz" className="text-[#F72585] hover:underline">quiz de estilo</a>, ou
              limpar os dados deste site nas configurações do seu navegador.
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
