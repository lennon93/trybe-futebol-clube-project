import IMatch from '../Interfaces/Match/IMatch';
import ITeam from '../Interfaces/Team/ITeam';
import ILeaderboard from '../Interfaces/Leaderboard/ILeaderboard';

export default class CreateLeaderboard {
  static async getAllTeams(allTeams: ITeam[]): Promise<ILeaderboard[]> {
    const leaderboardEmpty = allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '',
    }));
    return leaderboardEmpty;
  }

  static points(firstTeamGoals: number, secondTeamGoals: number, points: number): number {
    if (firstTeamGoals > secondTeamGoals) return points + 3;
    if (firstTeamGoals === secondTeamGoals) return points + 1;
    return points;
  }

  static win(firstTeamGoals: number, secondTeamGoals: number, wins: number): number {
    if (firstTeamGoals > secondTeamGoals) return wins + 1;
    return wins;
  }

  static lose(firstTeamGoals: number, secondTeamGoals: number, loses: number): number {
    if (firstTeamGoals < secondTeamGoals) return loses + 1;
    return loses;
  }

  static draw(firstTeamGoals: number, secondTeamGoals: number, draws: number): number {
    if (firstTeamGoals === secondTeamGoals) return draws + 1;
    return draws;
  }

  static balanceCalc(firstTeamGoals: number, secondTeamGoals: number, balance: number):
  number {
    const currentGoalsBalance = balance + (firstTeamGoals - secondTeamGoals);
    return currentGoalsBalance;
  }

  static eff(points: number, games: number):
  string {
    const efficiency = (points / (games * 3)) * 100;
    return efficiency.toFixed(2).toString();
  }

  static orderByGoals(a: ILeaderboard, b: ILeaderboard): number {
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance === b.goalsBalance) {
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
    }
    return 0;
  }

  static orderByWin(a: ILeaderboard, b: ILeaderboard): number {
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories === b.totalVictories) return this.orderByGoals(a, b);
    return 0;
  }

  static orderLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    leaderboard.sort((a, b): number => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints === b.totalPoints) return this.orderByWin(a, b);
      return 0;
    });
    return leaderboard;
  }

  static home(empty: ILeaderboard[], matchs: IMatch[]):ILeaderboard[] {
    const leaderboard = [] as ILeaderboard[];
    empty.map((team) => {
      const t = team;
      matchs.forEach((match) => {
        if (match.homeTeam?.teamName === team.name) {
          const { homeTeamGoals, awayTeamGoals } = match;
          t.totalPoints = this.points(homeTeamGoals, awayTeamGoals, t.totalPoints);
          t.totalGames += 1;
          t.totalVictories = this.win(homeTeamGoals, awayTeamGoals, t.totalVictories);
          t.totalDraws = this.draw(homeTeamGoals, awayTeamGoals, t.totalDraws);
          t.totalLosses = this.lose(homeTeamGoals, awayTeamGoals, t.totalLosses);
          t.goalsFavor += match.homeTeamGoals;
          t.goalsOwn += match.awayTeamGoals;
          t.goalsBalance = this.balanceCalc(homeTeamGoals, awayTeamGoals, team.goalsBalance);
          t.efficiency = this.eff(team.totalPoints, team.totalGames);
        }
      }); return leaderboard.push(t);
    }); return leaderboard as ILeaderboard[];
  }

  static away(empty: ILeaderboard[], matchs: IMatch[]):ILeaderboard[] {
    const leaderboard = [] as ILeaderboard[];
    empty.map((team) => {
      const t = team;
      matchs.forEach((match) => {
        if (match.awayTeam?.teamName === team.name) {
          const { homeTeamGoals, awayTeamGoals } = match;
          t.totalPoints = this.points(awayTeamGoals, homeTeamGoals, t.totalPoints);
          t.totalGames += 1;
          t.totalVictories = this.win(awayTeamGoals, homeTeamGoals, t.totalVictories);
          t.totalDraws = this.draw(awayTeamGoals, homeTeamGoals, t.totalDraws);
          t.totalLosses = this.lose(awayTeamGoals, homeTeamGoals, t.totalLosses);
          t.goalsFavor += match.awayTeamGoals;
          t.goalsOwn += match.homeTeamGoals;
          t.goalsBalance = this.balanceCalc(awayTeamGoals, homeTeamGoals, team.goalsBalance);
          t.efficiency = this.eff(team.totalPoints, team.totalGames);
        }
      }); return leaderboard.push(t);
    }); return leaderboard as ILeaderboard[];
  }

  static total(home: ILeaderboard[], away: ILeaderboard[]):ILeaderboard[] {
    const leaderboard = [] as ILeaderboard[];
    home.map((team) => {
      const h = team;
      away.forEach((a) => {
        if (h.name === a.name) {
          h.totalPoints += a.totalPoints;
          h.totalGames += a.totalGames;
          h.totalVictories += a.totalVictories;
          h.totalDraws += a.totalDraws;
          h.totalLosses += a.totalLosses;
          h.goalsFavor += a.goalsFavor;
          h.goalsOwn += a.goalsOwn;
          h.goalsBalance += a.goalsBalance;
          h.efficiency = this.eff(h.totalPoints, h.totalGames);
        }
      }); return leaderboard.push(h);
    }); return leaderboard as ILeaderboard[];
  }
}
