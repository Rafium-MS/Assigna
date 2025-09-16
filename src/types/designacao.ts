export interface Designacao {
  id: string;
  territorioId: string;
  saidaId: string;
  dataInicial: string;
  dataFinal: string;
  devolvido?: boolean;
}
