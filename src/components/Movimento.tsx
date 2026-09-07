'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Respeito a "reduzir movimento" no lugar certo.
 *
 * Antes, cada componente perguntava `useReducedMotion()` durante a renderizacao
 * e devolvia uma arvore diferente. Como o HTML sai do build sem saber a
 * preferencia de quem le, quem tinha a opcao ligada recebia do servidor uma
 * pagina e do navegador outra: a hidratacao do React falhava e a pagina inteira
 * era redesenhada no cliente.
 *
 * `reducedMotion="user"` resolve isso pelo caminho do proprio framer-motion:
 * o HTML e sempre o mesmo, e quem pediu menos movimento simplesmente nao ve as
 * animacoes de posicao e escala.
 */
export default function Movimento({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
