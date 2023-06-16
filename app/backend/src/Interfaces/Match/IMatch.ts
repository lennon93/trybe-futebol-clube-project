import { Identifiable } from '..';
import ITeam from '../Team/ITeam';

export default interface IMatch extends Identifiable {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam?: ITeam,
  awayTeam?: ITeam,
}
