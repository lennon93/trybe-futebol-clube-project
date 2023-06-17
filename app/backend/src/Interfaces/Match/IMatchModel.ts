import { ICRUDModelCreator, ICRUDModelUpdater } from '../ICRUDModel';
import IMatch from './IMatch';

export type IMatchModel<T> = ICRUDModelUpdater<IMatch> & ICRUDModelCreator<IMatch> & {
  findAll(query?: boolean): Promise<T[]>,
};
