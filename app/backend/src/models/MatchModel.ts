import { ID, NewEntity } from '../Interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/Match/IMatch';
import { IMatchModel } from '../Interfaces/Match/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel<IMatch> {
  private matchSequelize = SequelizeMatch;
  private teamSequelize = SequelizeTeam;

  async findAll(query?: boolean): Promise<IMatch[]> {
    const filterInProgress = query !== undefined ? { inProgress: query } : {};

    const allMatchs = await this.matchSequelize.findAll({ include: [
      { model: this.teamSequelize, as: 'homeTeam', attributes: ['teamName'] },
      { model: this.teamSequelize, as: 'awayTeam', attributes: ['teamName'] },
    ],
    where: filterInProgress });

    return allMatchs;
  }

  async update(id: ID, data: Partial<IMatch>):Promise<IMatch | null> {
    const match = await this.matchSequelize.findByPk(id);
    if (!match) return null;
    await this.matchSequelize.update(data, { where: { id } });
    return match;
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch | null> {
    const { homeTeamId, awayTeamId } = data;
    const homeTeam = await this.teamSequelize.findByPk(homeTeamId);
    const awayTeam = await this.teamSequelize.findByPk(awayTeamId);
    if (!homeTeam || !awayTeam) return null;
    const newMatch = await this.matchSequelize.create(data);
    return newMatch;
  }
}
