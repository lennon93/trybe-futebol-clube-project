import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import ILeaderboard from '../Interfaces/Leaderboard/ILeaderboard';
import CreateLeaderboard from '../utils/CreateLeaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel: MatchModel,
    private teamModel: TeamModel,
  ) { }

  async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const allMatchs = await this.matchModel.findAll(false);
    const allTeams = await this.teamModel.findAll();
    const leaderboardEmpty = await CreateLeaderboard.getAllTeams(allTeams);
    const result = CreateLeaderboard.home(leaderboardEmpty, allMatchs);
    const leaderboard = CreateLeaderboard.orderLeaderboard(result);
    return leaderboard;
  }

  async getLeaderboardAway(): Promise<ILeaderboard[]> {
    const allMatchs = await this.matchModel.findAll(false);
    const allTeams = await this.teamModel.findAll();
    const leaderboardEmpty = await CreateLeaderboard.getAllTeams(allTeams);
    const result = CreateLeaderboard.away(leaderboardEmpty, allMatchs);
    const leaderboard = CreateLeaderboard.orderLeaderboard(result);
    return leaderboard;
  }

  async getLeaderboardTotal(): Promise<ILeaderboard[]> {
    const away = await this.getLeaderboardAway();
    const home = await this.getLeaderboardHome();
    const result = CreateLeaderboard.total(home, away);
    const leaderboard = CreateLeaderboard.orderLeaderboard(result);
    return leaderboard;
  }
}
