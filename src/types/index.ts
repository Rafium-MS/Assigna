export interface Territorio {
  id: string;
  nome: string;
  imagem?: string;
}

export interface Saida {
  id: string;
  nome: string;
  diaDaSemana: number;
  hora: string;
}

export interface Designacao {
  id: string;
  territorioId: string;
  saidaId: string;
  dataInicial: string;
  dataFinal: string;
}

export interface Sugestao {
  territorioId: string;
  saidaId: string;
  dataInicial: string;
  dataFinal: string;
}
