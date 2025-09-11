import type { Sugestao } from '../../types/sugestao';
import { db } from '../db';

export const SugestaoRepository = {
  async all(): Promise<Sugestao[]> {
    return db.sugestoes.toArray();
  },
  async add(sugestao: Sugestao): Promise<void> {
    await db.sugestoes.put(sugestao);
  },
  async bulkAdd(sugestoes: Sugestao[]): Promise<void> {
    await db.sugestoes.bulkPut(sugestoes);
  },
  async remove(territorioId: string, saidaId: string): Promise<void> {
    await db.sugestoes.delete([territorioId, saidaId]);
  }
};
