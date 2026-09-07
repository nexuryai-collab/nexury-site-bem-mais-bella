'use client';

import { useState } from 'react';

/**
 * O campo do cabecalho era um <input> solto: sem formulario, sem rota.
 * Digitar e apertar Enter nao fazia nada. Agora leva para /busca?q=.
 */
export default function BuscaHeader() {
  const [q, setQ] = useState('');

  return (
    <form
      role="search"
      action="/busca"
      method="get"
      className="relative"
      onSubmit={e => {
        if (!q.trim()) e.preventDefault();
      }}
    >
      <input
        type="search"
        name="q"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Pesquisar..."
        aria-label="Pesquisar no site"
        className="w-48 lg:w-72 bg-[#45495f]/60 border border-[rgba(240,72,133,0.2)] rounded-full px-4 py-2 text-sm text-[#9AA4AF] placeholder:text-[#9AA4AF]/50 focus:outline-none focus:border-[#F72585] focus:ring-2 focus:ring-[#F72585]/20 transition-all"
      />
    </form>
  );
}
