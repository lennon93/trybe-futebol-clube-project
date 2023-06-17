import { ICRUDModelUpdater } from '../ICRUDModel';

export type IMatchModel<T> = ICRUDModelUpdater<T> & {
  findAll(query?: boolean): Promise<T[]>,
};
