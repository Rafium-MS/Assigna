import db from '../db';

export interface Designacao {
  id: number;
  territorio_id: number;
  saida_id: number;
  data_designacao: string;
  data_devolucao: string;
}

export interface DesignacoesRepository {
  findConflitos(
    territorioId: number,
    dataDesignacao: string,
    dataDevolucao: string,
  ): Promise<Designacao[]>;
  findUltimaPorTerritorioESaida(
    territorioId: number,
    saidaId: number,
  ): Promise<Designacao | undefined>;
}

export const designacoesRepository: DesignacoesRepository = {
  async findConflitos(
    territorioId,
    dataDesignacao,
    dataDevolucao,
  ) {
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
  },

  async findUltimaPorTerritorioESaida(territorioId, saidaId) {
    const sql = `
                SELECT * FROM designacoes
                WHERE territorio_id = ? AND saida_id = ?
                ORDER BY data_devolucao DESC
                LIMIT 1
            `;
    const { rows } = await db.query<Designacao>(sql, [territorioId, saidaId]);
    return rows[0];
  },
};

/**
 * Usage example:
 *
 * ```ts
 * import { designacoesRepository } from '../repositories/designacoesRepository';
 * const conflitos = await designacoesRepository.findConflitos(1, '2024-01-01', '2024-02-01');
 * ```
 */

