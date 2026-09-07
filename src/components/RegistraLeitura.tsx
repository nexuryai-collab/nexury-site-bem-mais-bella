'use client';

import { useEffect } from 'react';

/**
 * Guarda no proprio navegador os ultimos artigos lidos, para a secao
 * "Para Voce" da home. Nada e enviado para servidor nenhum: sem perfil,
 * sem cookie, sem rastreamento entre sites. O leitor limpa os dados do
 * navegador e isso desaparece.
 */
const CHAVE = 'bmb:lidos';
const LIMITE = 20;

export default function RegistraLeitura({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;
    try {
      const atual: string[] = JSON.parse(localStorage.getItem(CHAVE) || '[]');
      const novo = [slug, ...atual.filter(s => s !== slug)].slice(0, LIMITE);
      localStorage.setItem(CHAVE, JSON.stringify(novo));
    } catch {
      // Navegador em modo privado ou com armazenamento bloqueado: segue sem registrar.
    }
  }, [slug]);

  return null;
}
