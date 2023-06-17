import { ID } from '../Interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/Match/IMatch';
import { IMatchModel } from '../Interfaces/Match/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel<IMatch> {
  private modelSequelize = SequelizeMatch;

  async findAll(query?: boolean): Promise<IMatch[]> {
    const filterInProgress = query !== undefined ? { inProgress: query } : {};

    const allMatchs = await this.modelSequelize.findAll({ include: [
      { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
      { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: filterInProgress });

    return allMatchs;
  }

  async update(id: ID, data: Partial<IMatch>):Promise<IMatch | null> {
    const match = await this.modelSequelize.findByPk(id);
    if (!match) return null;
    await this.modelSequelize.update(data, { where: { id } });
    return match;
  }
}
