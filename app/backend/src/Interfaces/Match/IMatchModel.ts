import { ICRUDModelUpdater } from '../ICRUDModel';
import IMatch from './IMatch';

export type IMatchModel<T> = ICRUDModelUpdater<IMatch> & {
  findAll(query?: boolean): Promise<T[]>,
};
