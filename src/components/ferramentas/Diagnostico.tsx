'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Diagnostico Empreendedor.
 *
 * E o primeiro pedaco da proposta de plataforma que da para entregar hoje: um
 * questionario que termina em PLANO, nao em resultado decorativo. Roda inteiro
 * no navegador, sem conta, sem servidor, sem enviar nada — o que faz dele o
 * teste mais barato possivel da tese "a leitora quer a proxima acao, nao mais
 * um artigo".
 *
 * Duas regras que valem para tudo aqui:
 *
 * 1. Nenhum passo promete faturamento, prazo ou resultado. O que ele entrega e
 *    ordem: o que fazer antes do que. Isso a gente sabe; quanto ela vai ganhar,
 *    nao.
 * 2. Todo artigo indicado no fim existe no acervo. Se um dia for arquivado, o
 *    link cai na busca, nunca num 404 silencioso.
 */

type Chave = 'estagio' | 'tempo' | 'capital' | 'talento' | 'praca' | 'meta';

type Pergunta = {
  chave: Chave;
  titulo: string;
  ajuda?: string;
  opcoes: { valor: string; texto: string; detalhe?: string }[];
};

const PERGUNTAS: Pergunta[] = [
  {
    chave: 'estagio',
    titulo: 'Em que ponto voce esta hoje?',
    ajuda: 'Nao existe resposta atrasada. So muda por onde a gente comeca.',
    opcoes: [
      { valor: 'ideia', texto: 'Ainda nao sei o que fazer', detalhe: 'Tenho vontade, nao tenho o negocio' },
      { valor: 'escolhendo', texto: 'Tenho uma ideia na cabeca', detalhe: 'Mas nunca testei com ninguem' },
      { valor: 'vendendo', texto: 'Ja vendi algumas vezes', detalhe: 'De boca, para conhecidas, sem constancia' },
      { valor: 'crescendo', texto: 'Ja tenho clientes', detalhe: 'Quero organizar e crescer' },
    ],
  },
  {
    chave: 'tempo',
    titulo: 'Quanto tempo por semana voce tem de verdade?',
    ajuda: 'Conte o tempo que sobra depois do trabalho, da casa e de quem depende de voce.',
    opcoes: [
      { valor: 'pouco', texto: 'Menos de 5 horas' },
      { valor: 'medio', texto: 'Entre 5 e 15 horas' },
      { valor: 'muito', texto: 'Mais de 15 horas' },
    ],
  },
  {
    chave: 'capital',
    titulo: 'Quanto da para investir agora sem apertar as contas?',
    ajuda: 'Dinheiro que, se sumir, nao falta na mesa nem atrasa boleto.',
    opcoes: [
      { valor: 'zero', texto: 'Nada por enquanto' },
      { valor: 'baixo', texto: 'Ate uns R$ 1.000' },
      { valor: 'medio', texto: 'Entre R$ 1.000 e R$ 5.000' },
      { valor: 'alto', texto: 'Mais de R$ 5.000' },
    ],
  },
  {
    chave: 'talento',
    titulo: 'O que voce ja faz bem, hoje, sem estudar mais nada?',
    opcoes: [
      { valor: 'maos', texto: 'Faco coisas com as maos', detalhe: 'Comida, costura, artesanato, unha, cabelo' },
      { valor: 'cuidar', texto: 'Cuido bem de pessoas', detalhe: 'Estetica, saude, criancas, idosos, casa' },
      { valor: 'organizar', texto: 'Organizo e resolvo', detalhe: 'Administrativo, planilha, agenda, processo' },
      { valor: 'comunicar', texto: 'Explico e convenco', detalhe: 'Escrever, ensinar, vender, aparecer' },
    ],
  },
  {
    chave: 'praca',
    titulo: 'Onde faz mais sentido voce vender?',
    opcoes: [
      { valor: 'bairro', texto: 'Aqui perto de casa' },
      { valor: 'online', texto: 'Pela internet' },
      { valor: 'ambos', texto: 'Os dois' },
    ],
  },
  {
    chave: 'meta',
    titulo: 'O que voce quer que tenha acontecido daqui a 90 dias?',
    opcoes: [
      { valor: 'primeira', texto: 'Minha primeira venda de verdade' },
      { valor: 'renda', texto: 'Uma renda extra todo mes' },
      { valor: 'principal', texto: 'Isso virar minha renda principal' },
      { valor: 'organizar', texto: 'Botar ordem no que ja existe' },
    ],
  },
];

type Respostas = Partial<Record<Chave, string>>;

/* ------------------------------------------------------------------ */
/* O plano                                                             */
/* ------------------------------------------------------------------ */

const ESTAGIO_NOME: Record<string, string> = {
  ideia: 'Antes da ideia',
  escolhendo: 'Ideia sem teste',
  vendendo: 'Venda solta',
  crescendo: 'Negocio em pe',
};

const ESTAGIO_FRASE: Record<string, string> = {
  ideia:
    'Voce nao esta atrasada: esta antes da escolha. O trabalho agora nao e abrir empresa, e descobrir o que voce ja sabe fazer que alguem pagaria.',
  escolhendo:
    'Voce tem ideia e nao tem prova. O passo mais barato do mundo agora e falar com gente de verdade antes de gastar um real.',
  vendendo:
    'Voce ja provou que alguem paga. O que falta nao e talento, e repeticao: fazer de novo, de proposito, com preco fechado.',
  crescendo:
    'Voce tem negocio. Daqui para frente o que trava nao e vender mais, e saber quanto sobra e onde some.',
};

type Passo = { titulo: string; texto: string };

function montarPlano(r: Respostas): {
  estagio: string;
  frase: string;
  passos: Passo[];
  evitar: string[];
  leituras: { slug: string; titulo: string }[];
} {
  const estagio = r.estagio || 'ideia';
  const passos: Passo[] = [];

  /* 1. O primeiro passo depende de onde ela esta. */
  if (estagio === 'ideia') {
    passos.push({
      titulo: 'Escreva 10 coisas que ja te pediram',
      texto:
        'Nao ideias de negocio: pedidos reais. "Faz aquele bolo", "me ajuda com a planilha", "quem corta seu cabelo". O que as pessoas ja te pedem e a lista mais honesta de onde voce tem valor.',
    });
    passos.push({
      titulo: 'Circule as tres que voce faria de novo amanha',
      texto:
        'Corte o que da preguica so de pensar. Um negocio que voce odeia nao sobrevive ao terceiro mes cansado.',
    });
  } else if (estagio === 'escolhendo') {
    passos.push({
      titulo: 'Fale com 5 pessoas que teriam esse problema',
      texto:
        'Sem vender nada. So pergunte como elas resolvem isso hoje e quanto pagam. Se ninguem paga nada hoje, voce nao achou um problema — achou um gosto seu.',
    });
    passos.push({
      titulo: 'Faca uma vez, para uma pessoa so',
      texto:
        'A menor versao possivel do que voce quer vender, entregue para uma pessoa. Antes de logo, de nome, de Instagram, de CNPJ.',
    });
  } else if (estagio === 'vendendo') {
    passos.push({
      titulo: 'Feche um preco e pare de negociar caso a caso',
      texto:
        'Escreva: quanto custa, o que inclui, o que nao inclui, prazo. Preco decidido na hora, por telefone, e onde a margem morre.',
    });
    passos.push({
      titulo: 'Anote as ultimas 10 vendas num papel so',
      texto:
        'O que vendeu, por quanto, quanto custou, quanto sobrou. Sem sistema. Esse papel costuma revelar que o produto mais vendido e o que menos rende.',
    });
  } else {
    passos.push({
      titulo: 'Separe o dinheiro do negocio do dinheiro da casa',
      texto:
        'Enquanto for a mesma conta, nao existe lucro — existe sensacao. Essa e a mudanca que muda mais numero de uma vez so.',
    });
    passos.push({
      titulo: 'Descubra quanto sobra por servico, nao no mes',
      texto:
        'Margem por item entrega uma decisao que o faturamento do mes esconde: o que parar de vender.',
    });
  }

  /* 2. Capital e tempo mandam no ritmo. */
  if (r.capital === 'zero' || r.capital === 'baixo') {
    passos.push({
      titulo: 'Comece pelo que ja esta pago',
      texto:
        'Use o que voce ja tem em casa e o WhatsApp que voce ja usa. Loja, site e estoque entram depois da primeira venda repetida, nunca antes.',
    });
  }
  if (r.capital === 'medio' || r.capital === 'alto') {
    passos.push({
      titulo: 'Segure o investimento ate a terceira venda',
      texto:
        'Ter dinheiro para investir e a armadilha mais comum: gasta-se em marca, embalagem e equipamento antes de saber se alguem compra. Prove primeiro, equipe depois.',
    });
  }

  if (r.tempo === 'pouco') {
    passos.push({
      titulo: 'Escolha dois horarios fixos na semana',
      texto:
        'Com menos de 5 horas, o que mata nao e a falta de tempo, e o tempo picado. Dois blocos marcados na agenda rendem mais que sete sobras de quinze minutos.',
    });
  }

  /* 3. Praca e talento definem o canal. */
  if (r.praca === 'bairro' || r.praca === 'ambos') {
    passos.push({
      titulo: 'Apareca onde voce ja e conhecida',
      texto:
        'Grupo de WhatsApp do predio, da rua, da escola, da igreja. Primeira venda quase nunca vem de anuncio: vem de quem ja confia em voce.',
    });
  }
  if (r.praca === 'online' || r.praca === 'ambos') {
    passos.push({
      titulo: 'Um perfil, um jeito de comprar',
      texto:
        'Um perfil que diz o que voce faz, para quem, e como comprar. Sem catalogo de 40 itens: quem tenta escolher entre tudo nao escolhe nada.',
    });
  }

  if (r.talento === 'maos') {
    passos.push({
      titulo: 'Fotografe o processo, nao so o resultado',
      texto:
        'Em produto feito a mao, o que vende e a mao trabalhando. Isso e conteudo de graca e prova ao mesmo tempo.',
    });
  }
  if (r.talento === 'cuidar') {
    passos.push({
      titulo: 'Peca depoimento na hora, nao depois',
      texto:
        'No fim do atendimento, com a cliente satisfeita ali. Depois, por mensagem, quase ninguem responde.',
    });
  }
  if (r.talento === 'organizar') {
    passos.push({
      titulo: 'Venda o resultado, nao a planilha',
      texto:
        'Ninguem compra "organizacao". Compram "voce vai saber quanto sobra todo dia 5". Nomeie o alivio, nao a ferramenta.',
    });
  }
  if (r.talento === 'comunicar') {
    passos.push({
      titulo: 'Ensine de graca uma coisa util por semana',
      texto:
        'Quem explica bem constroi confianca antes de precisar vender. E o unico canal que fica mais barato com o tempo.',
    });
  }

  /* 4. A meta fecha o plano. */
  if (r.meta === 'primeira') {
    passos.push({
      titulo: 'Marque a data da primeira venda',
      texto:
        'Escolha um dia nas proximas duas semanas e trabalhe de tras para frente. Meta sem data vira desejo.',
    });
  }
  if (r.meta === 'renda') {
    passos.push({
      titulo: 'Descubra sua conta minima',
      texto:
        'Quanto voce precisa vender por mes para valer a pena. Divida pelo seu preco: esse numero e quantos clientes voce procura, e ele costuma ser menor do que parecia.',
    });
  }
  if (r.meta === 'principal') {
    passos.push({
      titulo: 'Nao largue o emprego pelo faturamento',
      texto:
        'A conta que importa e quanto sobra, repetido por alguns meses seguidos, com uma reserva atras. Faturar bem um mes nao e renda.',
    });
  }
  if (r.meta === 'organizar') {
    passos.push({
      titulo: 'Escreva o passo a passo do que voce ja faz',
      texto:
        'O que so existe na sua cabeca nao pode ser delegado nem melhorado. Processo escrito e a porta para parar de fazer tudo sozinha.',
    });
  }

  /* O que nao fazer agora — a parte que quase nenhum plano traz. */
  const evitar: string[] = [];
  if (estagio === 'ideia' || estagio === 'escolhendo') {
    evitar.push('Abrir CNPJ antes de saber se alguem compra');
    evitar.push('Encomendar logo e identidade visual');
    evitar.push('Comprar curso caro para "estar pronta"');
  }
  if (estagio === 'vendendo') {
    evitar.push('Aumentar variedade antes de fechar preco');
    evitar.push('Investir em anuncio antes de saber a margem');
  }
  if (estagio === 'crescendo') {
    evitar.push('Contratar antes de ter processo escrito');
    evitar.push('Comprar sistema para resolver problema de organizacao');
  }
  if (r.capital === 'zero') {
    evitar.push('Fazer divida para comecar');
  }

  /* Leituras — todas conferidas no acervo. */
  const leituras: { slug: string; titulo: string }[] = [];
  if (estagio === 'ideia' || estagio === 'escolhendo') {
    leituras.push({ slug: 'carreira-proposito-feminino-2026', titulo: 'Carreira com Proposito Feminino: como encontrar o que e seu' });
    leituras.push({ slug: 'metas-planejamento-2026', titulo: 'Metas e Planejamento: como definir objetivos com clareza' });
  } else {
    leituras.push({ slug: 'prosperidade-feminina-2026', titulo: 'Prosperidade Feminina: o que o numero esconde' });
    leituras.push({ slug: 'financas-femininas-2026', titulo: 'Financas Femininas: o guia completo' });
  }
  if (r.meta === 'renda' || r.meta === 'principal' || r.capital !== 'zero') {
    leituras.push({ slug: 'investimentos-iniciantes-mulheres-2026', titulo: 'Investimentos para iniciantes: por onde comecar' });
  } else {
    leituras.push({ slug: 'femmes-empoderadas-2026', titulo: 'Mulheres Empoderadas: liderancas que transformam' });
  }

  return {
    estagio: ESTAGIO_NOME[estagio],
    frase: ESTAGIO_FRASE[estagio],
    passos,
    evitar,
    leituras,
  };
}

/* ------------------------------------------------------------------ */

const CHAVE = 'bmb:diagnostico';

export default function Diagnostico() {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});
  const [pronto, setPronto] = useState(false);
  const [salvoAntes, setSalvoAntes] = useState<Respostas | null>(null);

  useEffect(() => {
    try {
      const bruto = localStorage.getItem(CHAVE);
      if (bruto) setSalvoAntes(JSON.parse(bruto));
    } catch {
      // armazenamento bloqueado: segue sem historico
    }
  }, []);

  const responder = (chave: Chave, valor: string) => {
    const novas = { ...respostas, [chave]: valor };
    setRespostas(novas);
    if (passo + 1 < PERGUNTAS.length) {
      setPasso(passo + 1);
    } else {
      setPronto(true);
      try {
        localStorage.setItem(CHAVE, JSON.stringify(novas));
      } catch {
        // sem armazenamento, o plano vale so para esta visita
      }
    }
  };

  const recomecar = () => {
    setRespostas({});
    setPasso(0);
    setPronto(false);
  };

  const retomar = () => {
    if (!salvoAntes) return;
    setRespostas(salvoAntes);
    setPronto(true);
  };

  if (pronto) {
    const plano = montarPlano(respostas);
    return (
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold">
            Seu ponto de partida
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl text-[#f5f0e6] mt-2">
            {plano.estagio}
          </h2>
          <p className="text-[#9AA4AF] text-lg mt-4 leading-relaxed">{plano.frase}</p>

          <h3 className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold mt-12 mb-5">
            Na ordem
          </h3>
          <ol className="space-y-4">
            {plano.passos.map((p, i) => (
              <li
                key={i}
                className="flex gap-4 p-5 rounded-2xl bg-[#45495f]/15 border border-[rgba(240,72,133,0.12)]"
              >
                <span className="font-[family-name:var(--font-cormorant)] text-3xl text-[#F72585]/70 leading-none tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-[#f5f0e6] font-semibold">{p.titulo}</h4>
                  <p className="text-[#9AA4AF]/85 text-sm mt-1.5 leading-relaxed">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          {plano.evitar.length ? (
            <>
              <h3 className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold mt-12 mb-5">
                O que nao fazer ainda
              </h3>
              <ul className="space-y-2">
                {plano.evitar.map((e, i) => (
                  <li key={i} className="flex gap-3 text-[#9AA4AF]/85 text-sm">
                    <span className="text-[#F72585] mt-0.5">&times;</span>
                    {e}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <h3 className="text-[#F72585] text-xs uppercase tracking-[0.3em] font-bold mt-12 mb-5">
            Para ler em seguida
          </h3>
          <div className="space-y-3">
            {plano.leituras.map(l => (
              <a
                key={l.slug}
                href={'/artigos/' + l.slug}
                className="group block p-4 rounded-xl bg-[#45495f]/10 border border-[rgba(240,72,133,0.1)] hover:border-[#F72585]/45 transition-all"
              >
                <span className="text-[#f5f0e6] group-hover:text-[#F72585] transition-colors">
                  {l.titulo}
                </span>
              </a>
            ))}
          </div>

          <p className="text-[#9AA4AF]/55 text-xs mt-12 leading-relaxed border-t border-[rgba(240,72,133,0.12)] pt-6">
            Este plano organiza a ordem das coisas a partir do que voce respondeu. Ele nao promete
            resultado, prazo nem faturamento, e nao substitui contador, advogado ou consultoria.
            Suas respostas ficam guardadas so neste navegador — nao passam por servidor nenhum.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={recomecar}
              className="px-6 py-3 rounded-full bg-[#45495f]/40 border border-[rgba(240,72,133,0.25)] text-[#f5f0e6] text-sm hover:border-[#F72585] transition-all"
            >
              Refazer o diagnostico
            </button>
            <a
              href="/carreira-e-financas"
              className="btn-rosa px-6 py-3 rounded-full font-bold text-sm"
            >
              Ver tudo de Carreira e Financas
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  const p = PERGUNTAS[passo];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-[3px] rounded-full bg-[#45495f]/40 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#F72585] to-[#e85d8a]"
            initial={false}
            animate={{ width: ((passo + 1) / PERGUNTAS.length) * 100 + '%' }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-[#9AA4AF]/60 text-xs tabular-nums">
          {passo + 1}/{PERGUNTAS.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={p.chave}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-[#f5f0e6] leading-tight">
            {p.titulo}
          </h2>
          {p.ajuda ? <p className="text-[#9AA4AF]/70 text-sm mt-3">{p.ajuda}</p> : null}

          <div className="mt-8 space-y-3">
            {p.opcoes.map(o => (
              <button
                key={o.valor}
                onClick={() => responder(p.chave, o.valor)}
                className="w-full text-left p-5 rounded-2xl bg-[#45495f]/15 border border-[rgba(240,72,133,0.12)] hover:border-[#F72585]/60 hover:bg-[#45495f]/30 transition-all"
              >
                <span className="text-[#f5f0e6] block">{o.texto}</span>
                {o.detalhe ? (
                  <span className="text-[#9AA4AF]/60 text-sm block mt-1">{o.detalhe}</span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            {passo > 0 ? (
              <button
                onClick={() => setPasso(passo - 1)}
                className="text-[#9AA4AF]/70 text-sm hover:text-[#F72585] transition-colors"
              >
                &larr; Voltar
              </button>
            ) : null}
            {passo === 0 && salvoAntes ? (
              <button
                onClick={retomar}
                className="text-[#F72585] text-sm hover:underline"
              >
                Ver o plano que voce montou da ultima vez
              </button>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
