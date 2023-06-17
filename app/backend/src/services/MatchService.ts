import { ServiceResponse } from '../Interfaces/ServiceResponse';
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

  public async finishMatch(id: ID): Promise<ServiceResponse<IMatch> | null> {
    const data = { inProgress: false };
    const result = await this.matchModel.update(id, data);
    if (result === null) return null;
    return { status: 'SUCCESSFUL', data: result };
  }
}
