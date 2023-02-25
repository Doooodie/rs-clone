export default function convertNumberToDate(milliseconds: number, lang = 'en-US') {
  const date = new Date(milliseconds);
  const string = date.toLocaleString(lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return string;
}
