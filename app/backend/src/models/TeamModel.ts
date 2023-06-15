import ITeam from '../Interfaces/Team/ITeam';
import { ITeamModel } from '../Interfaces/Team/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();
    return allTeams.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const teamById = await this.model.findByPk(id);
    if (!teamById) return null;
    const { teamName } = teamById;
    return { id, teamName };
  }
}
