const db = require('../db');

async function verificarRegrasDesignacao(territorio_id, saida_id, data_designacao, data_devolucao) {
  const { rows: conflitos } = await db.query(
    `
            SELECT * FROM designacoes
            WHERE territorio_id = ?
            AND (
                (? BETWEEN data_designacao AND data_devolucao) OR
                (? BETWEEN data_designacao AND data_devolucao) OR
                (data_designacao BETWEEN ? AND ?) OR
                (data_devolucao BETWEEN ? AND ?)
            )
        `,
    [
      territorio_id,
      data_designacao,
      data_devolucao,
      data_designacao,
      data_devolucao,
      data_designacao,
      data_devolucao,
    ]
  );
  if (conflitos.length > 0) {
    throw new Error('❌ Território já está designado nesse período.');
  }

  const { rows } = await db.query(
    `
                SELECT * FROM designacoes
                WHERE territorio_id = ? AND saida_id = ?
                ORDER BY data_devolucao DESC
                LIMIT 1
            `,
    [territorio_id, saida_id]
  );
  const ultima = rows[0];
  if (ultima) {
    const dataUltima = new Date(ultima.data_devolucao);
    const dataNova = new Date(data_designacao);
    const mesesDiferenca = (dataNova.getFullYear() - dataUltima.getFullYear()) * 12 + (dataNova.getMonth() - dataUltima.getMonth());
    if (mesesDiferenca < 3) {
      throw new Error('❌ Esse território não pode ser designado para a mesma saída antes de 3 meses.');
    }
  }
  return true;
}

module.exports = { verificarRegrasDesignacao };

