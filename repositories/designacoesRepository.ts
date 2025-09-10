import db from '../db';

export interface Designacao {
  id: number;
  territorio_id: number;
  saida_id: number;
  data_designacao: string;
  data_devolucao: string;
}

export async function findConflitos(
  territorioId: number,
  dataDesignacao: string,
  dataDevolucao: string,
): Promise<Designacao[]> {
  const sql = `
            SELECT * FROM designacoes
            WHERE territorio_id = ?
            AND (
                (? BETWEEN data_designacao AND data_devolucao) OR
                (? BETWEEN data_designacao AND data_devolucao) OR
                (data_designacao BETWEEN ? AND ?) OR
                (data_devolucao BETWEEN ? AND ?)
            )
        `;
  const { rows } = await db.query<Designacao>(sql, [
    territorioId,
    dataDesignacao,
    dataDevolucao,
    dataDesignacao,
    dataDevolucao,
    dataDesignacao,
    dataDevolucao,
  ]);
  return rows;
}

export async function findUltimaPorTerritorioESaida(
  territorioId: number,
  saidaId: number,
): Promise<Designacao | undefined> {
  const sql = `
                SELECT * FROM designacoes
                WHERE territorio_id = ? AND saida_id = ?
                ORDER BY data_devolucao DESC
                LIMIT 1
            `;
  const { rows } = await db.query<Designacao>(sql, [territorioId, saidaId]);
  return rows[0];
}
