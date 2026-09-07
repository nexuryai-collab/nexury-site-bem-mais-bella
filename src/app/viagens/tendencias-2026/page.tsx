import { redirect } from 'next/navigation';

/** Mesma aposentadoria de /viagens: renderizava dado de teste. */
export const metadata = {
  robots: { index: false, follow: false },
};

export default function Page() {
  redirect('/estilo-de-vida');
}
