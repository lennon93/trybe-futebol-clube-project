import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

const teamModel = new TeamModel();
const matchModel = new MatchModel();
const leaderboardService = new LeaderboardService(matchModel, teamModel);
const leaderboardController = new LeaderboardController(leaderboardService);
const leaderboardRouter = Router();

leaderboardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderboardController.getLeaderboardHome(req, res),
);
leaderboardRouter.get(
  '/leaderboard/away',
  (req: Request, res: Response) => leaderboardController.getLeaderboardAway(req, res),
);

export default leaderboardRouter;
