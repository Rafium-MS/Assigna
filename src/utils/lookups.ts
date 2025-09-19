export const findName = <T extends { id: string }>(
  id: string,
  list: T[],
): string => {
  const item = list.find((entry) => entry.id === id);
  if (!item) return '—';
  if ('name' in item && typeof (item as { name?: string }).name === 'string') {
    return (item as { name: string }).name;
  }
  if ('nome' in item && typeof (item as { nome?: string }).nome === 'string') {
    return (item as { nome: string }).nome;
  }
  return '—';
};
