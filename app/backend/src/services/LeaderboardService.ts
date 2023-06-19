import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import ILeaderboard from '../Interfaces/Leaderboard/ILeaderboard';
import CreateLeaderboard from '../utils/CreateLeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private matchModel: MatchModel,
    private teamModel: TeamModel,
  ) { }

  async getLeaderboardHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allMatchs = await this.matchModel.findAll(false);
    const allTeams = await this.teamModel.findAll();
    const leaderboardEmpty = await CreateLeaderboard.getAllTeams(allTeams);
    const result = CreateLeaderboard.home(leaderboardEmpty, allMatchs);
    const leaderboard = CreateLeaderboard.orderLeaderboard(result);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  async getLeaderboardAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allMatchs = await this.matchModel.findAll(false);
    const allTeams = await this.teamModel.findAll();
    const leaderboardEmpty = await CreateLeaderboard.getAllTeams(allTeams);
    const result = CreateLeaderboard.away(leaderboardEmpty, allMatchs);
    const leaderboard = CreateLeaderboard.orderLeaderboard(result);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
