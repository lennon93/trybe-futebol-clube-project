import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get(
  '/matches',
  (req: Request, res: Response) => matchController.getAllMatchs(req, res),
);
matchRouter.get(
  '/matches/:id',
  (req: Request, res: Response) => matchController.getMatchById(req, res),
);

export default matchRouter;
