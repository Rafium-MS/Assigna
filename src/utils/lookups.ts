export const findName = <T extends { id: string; name: string }>(id: string, list: T[]): string => {
  return list.find((item) => item.id === id)?.name ?? '—';
};
