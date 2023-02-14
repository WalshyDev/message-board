export function classNames(...str: string[]) {
  return str.filter(Boolean).join(' ');
}