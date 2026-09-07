import Diagnostico from '@/components/ferramentas/Diagnostico';
import { Reveal, TituloRevelado } from '@/components/Motion';
import { FundoSecao } from '@/components/FundoTematico';

export const metadata = {
  title: 'Diagnostico Empreendedor | Bem Mais Bella',
  description:
    'Seis perguntas e um plano na ordem certa: o que fazer primeiro para tirar um negocio do papel, a partir do seu tempo, do seu dinheiro e do que voce ja sabe fazer.',
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20">
        <FundoSecao slug="carreira-e-financas" />
        <div className="relative max-w-3xl mx-auto px-6">
          <Reveal>
            <nav className="text-[11px] uppercase tracking-[0.2em] text-[#9AA4AF]/70 mb-4 flex flex-wrap gap-2">
              <a href="/" className="hover:text-[#F72585] transition">Inicio</a>
              <span>/</span>
              <a href="/ferramentas" className="hover:text-[#F72585] transition">Ferramentas</a>
            </nav>
          </Reveal>
          <TituloRevelado
            texto="Diagnostico Empreendedor"
            as="h1"
            className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl text-[#f5f0e6]"
          />
          <Reveal delay={0.1}>
            <p className="text-[#9AA4AF] text-lg mt-5 leading-relaxed">
              Seis perguntas. No fim, um plano na ordem certa — com o que fazer primeiro e,
              principalmente, o que <em>nao</em> fazer ainda.
            </p>
            <p className="text-[#9AA4AF]/55 text-sm mt-4 leading-relaxed">
              Sem cadastro, sem e-mail, sem envio. Roda inteiro no seu navegador.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <Diagnostico />
      </section>
    </main>
  );
}
