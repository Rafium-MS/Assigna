export type QueryParams = unknown[] | Record<string, unknown>;
export type QueryResult<Row = any> = { rows: Row[]; rowCount?: number };

export interface DB {
  connect(): Promise<void> | void;
  disconnect(): Promise<void> | void;
  query<Row = any>(sql: string, params?: QueryParams): Promise<QueryResult<Row>>;
  transaction<T>(fn: (tx: Tx) => Promise<T>): Promise<T>;
}

export interface Tx {
  query<Row = any>(sql: string, params?: QueryParams): Promise<QueryResult<Row>>;
}
