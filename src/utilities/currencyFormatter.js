const sweFormatter = new Intl.NumberFormat(
  'sv-SE', { style: 'currency', currency: 'SEK' }
);

export function sweFormat(number) {
  return sweFormatter.format(number);
}