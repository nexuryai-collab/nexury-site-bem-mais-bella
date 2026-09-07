-- Banco de comentários do Bem Mais Bella (Cloudflare D1).
--
-- Decisões de privacidade, alinhadas à Política de Privacidade do site:
--  - e-mail é opcional e NUNCA é publicado; serve só para responder a leitora;
--  - não guardamos IP em texto claro, só um hash com sal, para conter abuso;
--  - nada de cookie, nada de identificador entre sites, nada de terceiro.

CREATE TABLE IF NOT EXISTS comentarios (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL,           -- artigo ao qual pertence
  nome        TEXT NOT NULL,
  email       TEXT,                    -- opcional, nunca exibido
  texto       TEXT NOT NULL,
  criado_em   INTEGER NOT NULL,        -- epoch em segundos
  aprovado    INTEGER NOT NULL DEFAULT 0,
  ip_hash     TEXT,
  resposta_a  TEXT                     -- id do comentário respondido, se houver
);

CREATE INDEX IF NOT EXISTS idx_comentarios_slug
  ON comentarios (slug, aprovado, criado_em DESC);

CREATE INDEX IF NOT EXISTS idx_comentarios_moderacao
  ON comentarios (aprovado, criado_em DESC);
