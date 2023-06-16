export type IMatchModel<T> = { findAll(query?: boolean): Promise<T[]>, };
