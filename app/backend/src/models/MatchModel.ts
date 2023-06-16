import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/Match/IMatch';
import { IMatchModel } from '../Interfaces/Match/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel<IMatch> {
  private modelSequelize = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const allMatchs = await this.modelSequelize.findAll({ include: [
      { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
      { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
    ] });

    return allMatchs;
  }
}
