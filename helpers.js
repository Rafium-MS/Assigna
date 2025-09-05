const db = require('./db');

function verificarRegrasDesignacao(territorio_id, saida_id, data_designacao, data_devolucao) {
  return new Promise((resolve, reject) => {
    db.all(
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
      ],
      (err, conflitos) => {
        if (err) return reject(err);
        if (conflitos.length > 0) {
          return reject(new Error('❌ Território já está designado nesse período.'));
        }

        db.get(
          `
                SELECT * FROM designacoes
                WHERE territorio_id = ? AND saida_id = ?
                ORDER BY data_devolucao DESC
                LIMIT 1
            `,
          [territorio_id, saida_id],
          (err, ultima) => {
            if (err) return reject(err);
            if (ultima) {
              const dataUltima = new Date(ultima.data_devolucao);
              const dataNova = new Date(data_designacao);
              const mesesDiferenca = (dataNova.getFullYear() - dataUltima.getFullYear()) * 12 + (dataNova.getMonth() - dataUltima.getMonth());
              if (mesesDiferenca < 3) {
                return reject(new Error('❌ Esse território não pode ser designado para a mesma saída antes de 3 meses.'));
              }
            }
            resolve(true);
          }
        );
      }
    );
  });
}

module.exports = { verificarRegrasDesignacao };
