import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/Match/IMatchModel';
import IMatch from '../Interfaces/Match/IMatch';
import MatchModel from '../models/MatchModel';
import { ID, NewEntity } from '../Interfaces';

const NOT_FOUND = { message: 'Match not found' };

export default class MatchService {
  constructor(
    private matchModel: IMatchModel<IMatch> = new MatchModel(),
  ) { }

  public async getAllMatchs(query?: boolean): Promise<ServiceResponse<IMatch[]>> {
    const allMatchs = await this.matchModel.findAll(query);
    return { status: 'SUCCESSFUL', data: allMatchs };
  }

  public async finishMatch(id: ID): Promise<ServiceResponse<ServiceMessage>> {
    const data = { inProgress: false };
    const result = await this.matchModel.update(id, data);
    if (result === null) return { status: 'NOT_FOUND', data: NOT_FOUND };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: ID, data: Partial<IMatch>):
  Promise<ServiceResponse<ServiceMessage>> {
    const result = await this.matchModel.update(id, data);
    if (result === null) return { status: 'NOT_FOUND', data: NOT_FOUND };
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(data: NewEntity<IMatch>):
  Promise<ServiceResponse<IMatch>> {
    const match = { ...data, inProgress: true };
    const result = await this.matchModel.create(match);
    if (result === null) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    return { status: 'SUCCESSFUL', data: result };
  }
}
