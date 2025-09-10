import { findConflitos, findUltimaPorTerritorioESaida } from '../repositories/designacoesRepository';

export async function verificarRegrasDesignacao(
  territorioId: number,
  saidaId: number,
  dataDesignacao: string,
  dataDevolucao: string,
): Promise<boolean> {
  const conflitos = await findConflitos(territorioId, dataDesignacao, dataDevolucao);
  if (conflitos.length > 0) {
    throw new Error('❌ Território já está designado nesse período.');
  }

  const ultima = await findUltimaPorTerritorioESaida(territorioId, saidaId);
  if (ultima) {
    const dataUltima = new Date(ultima.data_devolucao);
    const dataNova = new Date(dataDesignacao);
    const mesesDiferenca =
      (dataNova.getFullYear() - dataUltima.getFullYear()) * 12 +
      (dataNova.getMonth() - dataUltima.getMonth());
    if (mesesDiferenca < 3) {
      throw new Error('❌ Esse território não pode ser designado para a mesma saída antes de 3 meses.');
    }
  }
  return true;
}
