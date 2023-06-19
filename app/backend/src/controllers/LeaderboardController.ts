import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
  ) { }

  public async getLeaderboardHome(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardHome();

    return res.status(200).json(serviceResponse);
  }

  public async getLeaderboardAway(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardAway();

    return res.status(200).json(serviceResponse);
  }

  public async getLeaderboardTotal(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardTotal();

    return res.status(200).json(serviceResponse);
  }
}
