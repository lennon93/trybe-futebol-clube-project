import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/Match/IMatchModel';
import IMatch from '../Interfaces/Match/IMatch';
import MatchModel from '../models/MatchModel';
import { ID } from '../Interfaces';

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
    if (result === null) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: ID, data: Partial<IMatch>):
  Promise<ServiceResponse<ServiceMessage>> {
    const result = await this.matchModel.update(id, data);
    if (result === null) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }
}
