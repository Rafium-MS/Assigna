export type Designacao = {
  id: number;
  territorio: string;
  saida: string;
  dia_semana: string;
  data_designacao: string; // YYYY-MM-DD
  data_devolucao: string;  // YYYY-MM-DD
  territorio_id: number;
  saida_id: number;
};

export type Saida = { id:number; nome:string; dia_semana:string };
export type HistoricoSaida = { territorio:string; data_designacao:string; data_devolucao:string };

export type Territorio = {
  id: number;
  descricao: string;
  latitude?: number | null;
  longitude?: number | null;
  enderecos?: Endereco[];
};

export type HistoricoLinha = {
  saida: string;
  data_designacao: string;
  data_devolucao: string;
};

export type Endereco = {
  rua: string;
  numero: string;
};