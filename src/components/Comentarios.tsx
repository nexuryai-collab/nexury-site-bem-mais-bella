'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Comentários do artigo.
 *
 * Conversa com a API própria (Cloudflare Worker + D1) definida em
 * NEXT_PUBLIC_API_COMENTARIOS. Enquanto essa variável não existir, a seção não
 * mostra formulário quebrado: convida a leitora a escrever por e-mail. Campo
 * que não funciona é pior que campo ausente.
 *
 * Sem terceiro, sem cookie, sem rastreamento — coerente com a Política de
 * Privacidade do site. Todo comentário passa por moderação antes de aparecer.
 */

const API = process.env.NEXT_PUBLIC_API_COMENTARIOS || '';
const CHAVE_NOME = 'bmb:nome';

type Comentario = { id: string; nome: string; texto: string; criado_em: number };

function quando(epoch: number) {
  const d = new Date(epoch * 1000);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function iniciais(nome: string) {
  return nome.trim().split(/\s+/).slice(0, 2).map(p => p[0]?.toUpperCase() || '').join('');
}

export default function Comentarios({ slug, titulo }: { slug: string; titulo: string }) {
  const [lista, setLista] = useState<Comentario[]>([]);
  const [carregando, setCarregando] = useState(!!API);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState<{ tipo: 'ok' | 'erro'; msg: string } | null>(null);
  const isca = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { setNome(localStorage.getItem(CHAVE_NOME) || ''); } catch { /* modo privado */ }
    if (!API) return;
    fetch(`${API}/comentarios?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(d => setLista(d.comentarios || []))
      .catch(() => setAviso({ tipo: 'erro', msg: 'Não consegui carregar os comentários agora.' }))
      .finally(() => setCarregando(false));
  }, [slug]);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!API || enviando) return;
    if (texto.trim().length < 3 || !nome.trim()) {
      setAviso({ tipo: 'erro', msg: 'Escreva seu nome e um comentário.' });
      return;
    }
    setEnviando(true);
    setAviso(null);
    try {
      try { localStorage.setItem(CHAVE_NOME, nome.trim()); } catch { /* modo privado */ }
      const r = await fetch(`${API}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug, nome, email, texto,
          site: isca.current?.value || '', // isca anti-robô
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.erro || 'Não foi possível enviar.');
      setTexto('');
      setAviso({
        tipo: 'ok',
        msg: 'Recebido. Seu comentário aparece assim que passar pela moderação.',
      });
    } catch (err: any) {
      setAviso({ tipo: 'erro', msg: err.message || 'Não foi possível enviar agora.' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 pb-24" id="comentarios">
      <div className="flex items-baseline justify-between gap-4 border-b border-[rgba(240,72,133,0.15)] pb-4 mb-8">
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl text-[#f5f0e6]">
          Deixe seu comentário
        </h2>
        {lista.length ? (
          <span className="text-[#9AA4AF]/60 text-sm whitespace-nowrap">
            {lista.length} {lista.length === 1 ? 'comentário' : 'comentários'}
          </span>
        ) : null}
      </div>

      {!API ? (
        <div className="rounded-2xl border border-[rgba(240,72,133,0.18)] bg-[#45495f]/15 p-8">
          <p className="text-[#9AA4AF] leading-relaxed">
            Os comentários estão sendo abertos. Enquanto isso, se este texto te tocou — ou se você
            discorda dele — escreva para a redação: sua leitura muda a próxima pauta.
          </p>
          <p className="text-[#9AA4AF]/60 text-sm mt-4">
            Sobre: <strong className="text-[#f5f0e6]">{titulo}</strong>
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={enviar} className="rounded-2xl border border-[rgba(240,72,133,0.18)] bg-[#45495f]/15 p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Seu nome"
                aria-label="Seu nome"
                maxLength={60}
                required
                className="px-5 py-3.5 rounded-full bg-[#240046]/60 border border-[rgba(240,72,133,0.22)] text-[#f5f0e6] placeholder:text-[#9AA4AF]/45 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="E-mail (opcional, nunca publicado)"
                aria-label="E-mail, opcional e nunca publicado"
                maxLength={160}
                className="px-5 py-3.5 rounded-full bg-[#240046]/60 border border-[rgba(240,72,133,0.22)] text-[#f5f0e6] placeholder:text-[#9AA4AF]/45 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all"
              />
            </div>

            {/* isca anti-robô: escondida de gente, visível para script */}
            <input
              ref={isca}
              type="text"
              name="site"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute w-px h-px -left-[9999px] opacity-0"
            />

            <textarea
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder="O que você achou? Discordar também vale."
              aria-label="Seu comentário"
              rows={5}
              maxLength={3000}
              required
              className="w-full mt-4 px-5 py-4 rounded-2xl bg-[#240046]/60 border border-[rgba(240,72,133,0.22)] text-[#f5f0e6] placeholder:text-[#9AA4AF]/45 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all resize-y"
            />

            <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
              <p className="text-[#9AA4AF]/50 text-xs max-w-sm leading-relaxed">
                Passa por moderação antes de aparecer. Seu e-mail nunca é publicado e não vira lista
                de disparo.
              </p>
              <button
                type="submit"
                disabled={enviando}
                className="btn-rosa px-8 py-3.5 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enviando ? 'Enviando...' : 'Comentar'}
              </button>
            </div>

            <AnimatePresence>
              {aviso ? (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={
                    'mt-4 text-sm ' + (aviso.tipo === 'ok' ? 'text-[#F72585]' : 'text-[#ff8fab]')
                  }
                  role="status"
                >
                  {aviso.msg}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </form>

          <div className="mt-10 space-y-5">
            {carregando ? (
              <p className="text-[#9AA4AF]/60 text-sm">Carregando comentários...</p>
            ) : !lista.length ? (
              <p className="text-[#9AA4AF]/60 text-sm">
                Ninguém comentou ainda. Seja a primeira — a conversa começa por alguém.
              </p>
            ) : (
              lista.map((c, i) => (
                <motion.article
                  key={c.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.05 }}
                  className="flex gap-4 p-5 rounded-2xl bg-[#45495f]/12 border border-[rgba(240,72,133,0.1)]"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-11 h-11 rounded-full grid place-items-center text-sm font-bold text-[#240046]"
                    style={{ background: 'linear-gradient(140deg,#F72585,#e0aaff)' }}
                  >
                    {iniciais(c.nome)}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <strong className="text-[#f5f0e6]">{c.nome}</strong>
                      <span className="text-[#9AA4AF]/45 text-xs">{quando(c.criado_em)}</span>
                    </div>
                    <p className="text-[#9AA4AF] leading-relaxed mt-1.5 whitespace-pre-line break-words">
                      {c.texto}
                    </p>
                  </div>
                </motion.article>
              ))
            )}
          </div>
        </>
      )}
    </section>
  );
}
