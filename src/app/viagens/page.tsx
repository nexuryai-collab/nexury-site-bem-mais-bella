import { redirect } from 'next/navigation';

/**
 * /viagens — aposentada.
 *
 * Esta rota renderizava NOTICIAS_MOCK: manchetes inventadas atribuidas a
 * instituicoes e a pessoas reais ("USP Lanca Cartilha...", "Lula Sanciona Tres
 * Leis..."). Dado de teste numa rota publica.
 *
 * O `_redirects` ja manda /viagens para /estilo-de-vida na borda, mas a pagina
 * continuava sendo gerada com o texto dentro. Agora ela nao renderiza nada: o
 * conteudo falso deixa de existir no pacote publicado, nao so de ser servido.
 *
 * Viagens e subcategoria de Estilo de Vida — e la que o assunto vive.
 */
export const metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  redirect('/estilo-de-vida');
}
