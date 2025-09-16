import type { Designacao } from '../types/designacao';

export const getLastAssignmentDate = (
  territoryId: string,
  designacoes: Designacao[],
): Date | undefined => {
  return designacoes
    .filter((designacao) => designacao.territorioId === territoryId)
    .map((designacao) => new Date(`${designacao.dataInicial}T00:00:00`))
    .sort((a, b) => b.getTime() - a.getTime())[0];
};
