/**
 * Formatacao de data sem Intl.
 *
 * `toLocaleDateString('pt-BR')` depende do ICU disponivel no Node do build e
 * do fuso do navegador de quem le: o servidor gerava "Tue Sep 15" e o cliente
 * "15 de setembro de 2026", o que quebrava a hidratacao do React e ainda
 * mostrava data em ingles para leitora brasileira. Aqui a saida e a mesma nos
 * dois lados, sempre.
 */
const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/** Qualquer entrada conhecida vira "AAAA-MM-DD". Vazio se nao der. */
export function paraISO(valor: string): string {
  if (!valor) return '';
  const bruto = String(valor).trim();
  const jaISO = bruto.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (jaISO) return jaISO[0];
  const d = new Date(bruto);
  if (isNaN(d.getTime())) return '';
  return (
    d.getUTCFullYear() + '-' +
    String(d.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(d.getUTCDate()).padStart(2, '0')
  );
}

/** "2026-09-15" -> "15 de setembro de 2026". */
export function dataPorExtenso(valor: string): string {
  const iso = paraISO(valor);
  if (!iso) return '';
  const [ano, mes, dia] = iso.split('-');
  return Number(dia) + ' de ' + MESES[Number(mes) - 1] + ' de ' + ano;
}
