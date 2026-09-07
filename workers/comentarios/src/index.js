/**
 * API de comentários do Bem Mais Bella — Cloudflare Worker + D1.
 *
 * Por que própria, e não Disqus: Disqus injeta publicidade de terceiros e
 * rastreia a leitora entre sites, o que contradiz a Política de Privacidade
 * deste site e adiciona peso enorme à página. Aqui os dados ficam no banco do
 * próprio projeto, sem cookie e sem identificador entre sites.
 *
 * O que é "misturado" de serviço gerenciado: a Cloudflare cuida de servidor,
 * banco e proteção anti-robô (Turnstile). O que é próprio: os dados.
 *
 * Rotas:
 *   GET  /comentarios?slug=...        lista os aprovados de um artigo
 *   POST /comentarios                 recebe um novo (entra em moderação)
 *   GET  /moderacao?token=...         lista os pendentes (uso do editor)
 *   POST /moderacao                   aprova ou remove (uso do editor)
 */

const LIMITE_TEXTO = 3000;
const LIMITE_NOME = 60;
const JANELA_SEGUNDOS = 120; // intervalo mínimo entre dois envios do mesmo IP

function cors(env) {
  return {
    'Access-Control-Allow-Origin': env.ORIGEM_PERMITIDA || '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  };
}

function json(dados, env, status = 200) {
  return new Response(JSON.stringify(dados), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors(env) },
  });
}

/** Hash com sal: contém abuso sem guardar o IP da leitora em texto claro. */
async function hashIp(ip, sal) {
  const dados = new TextEncoder().encode(String(sal || '') + '|' + String(ip || ''));
  const buf = await crypto.subtle.digest('SHA-256', dados);
  return [...new Uint8Array(buf)].slice(0, 12).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Escapa o que vem da leitora. O front também escapa; defesa em profundidade. */
function limpar(s, max) {
  return String(s || '').replace(/[<>]/g, '').trim().slice(0, max);
}

/** Verificação anti-robô da Cloudflare. Se não configurada, é ignorada. */
async function turnstileOk(token, env, ip) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;
  const corpo = new FormData();
  corpo.append('secret', env.TURNSTILE_SECRET);
  corpo.append('response', token);
  if (ip) corpo.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: corpo,
  });
  const d = await r.json();
  return !!d.success;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const rota = url.pathname.replace(/\/+$/, '') || '/';

    if (req.method === 'OPTIONS') return new Response(null, { headers: cors(env) });

    // ---------- leitura pública ----------
    if (req.method === 'GET' && rota.endsWith('/comentarios')) {
      const slug = limpar(url.searchParams.get('slug'), 200);
      if (!slug) return json({ erro: 'slug obrigatório' }, env, 400);

      const { results } = await env.DB.prepare(
        `SELECT id, nome, texto, criado_em, resposta_a
           FROM comentarios
          WHERE slug = ?1 AND aprovado = 1
          ORDER BY criado_em ASC
          LIMIT 500`
      ).bind(slug).all();

      return json({ slug, total: results.length, comentarios: results }, env);
    }

    // ---------- envio ----------
    if (req.method === 'POST' && rota.endsWith('/comentarios')) {
      let corpo;
      try { corpo = await req.json(); } catch { return json({ erro: 'JSON inválido' }, env, 400); }

      // Campo isca: humano não preenche, robô costuma preencher.
      if (corpo.site) return json({ ok: true, moderacao: true }, env);

      const slug = limpar(corpo.slug, 200);
      const nome = limpar(corpo.nome, LIMITE_NOME);
      const texto = limpar(corpo.texto, LIMITE_TEXTO);
      const email = limpar(corpo.email, 160);

      if (!slug || !nome || texto.length < 3) {
        return json({ erro: 'Preencha nome e comentário.' }, env, 400);
      }

      const ip = req.headers.get('CF-Connecting-IP') || '';
      if (!(await turnstileOk(corpo.turnstile, env, ip))) {
        return json({ erro: 'Verificação anti-robô falhou. Recarregue e tente de novo.' }, env, 400);
      }

      const ipHash = await hashIp(ip, env.SAL_IP || 'bmb');
      const agora = Math.floor(Date.now() / 1000);

      // Freio simples de repetição pelo mesmo IP.
      const recente = await env.DB.prepare(
        `SELECT criado_em FROM comentarios
          WHERE ip_hash = ?1 ORDER BY criado_em DESC LIMIT 1`
      ).bind(ipHash).first();

      if (recente && agora - recente.criado_em < JANELA_SEGUNDOS) {
        return json({ erro: 'Aguarde um instante antes de comentar de novo.' }, env, 429);
      }

      const id = crypto.randomUUID();
      await env.DB.prepare(
        `INSERT INTO comentarios (id, slug, nome, email, texto, criado_em, aprovado, ip_hash, resposta_a)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0, ?7, ?8)`
      ).bind(id, slug, nome, email || null, texto, agora, ipHash, limpar(corpo.resposta_a, 64) || null).run();

      return json({ ok: true, moderacao: true, id }, env);
    }

    // ---------- moderação (uso do editor) ----------
    const autorizado = () => {
      const t = url.searchParams.get('token') || req.headers.get('X-Token');
      return env.TOKEN_MODERACAO && t === env.TOKEN_MODERACAO;
    };

    if (rota.endsWith('/moderacao')) {
      if (!autorizado()) return json({ erro: 'não autorizado' }, env, 401);

      if (req.method === 'GET') {
        const { results } = await env.DB.prepare(
          `SELECT id, slug, nome, email, texto, criado_em
             FROM comentarios WHERE aprovado = 0
            ORDER BY criado_em ASC LIMIT 200`
        ).all();
        return json({ pendentes: results.length, comentarios: results }, env);
      }

      if (req.method === 'POST') {
        const { id, acao } = await req.json();
        if (!id) return json({ erro: 'id obrigatório' }, env, 400);

        if (acao === 'aprovar') {
          await env.DB.prepare('UPDATE comentarios SET aprovado = 1 WHERE id = ?1').bind(id).run();
          return json({ ok: true, id, acao }, env);
        }
        if (acao === 'remover') {
          await env.DB.prepare('DELETE FROM comentarios WHERE id = ?1').bind(id).run();
          return json({ ok: true, id, acao }, env);
        }
        return json({ erro: 'ação deve ser aprovar ou remover' }, env, 400);
      }
    }

    return json({ erro: 'rota não encontrada' }, env, 404);
  },
};
