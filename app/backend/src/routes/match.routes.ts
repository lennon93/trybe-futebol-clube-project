import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import LoginValidation from '../middlewares/LoginValidation';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.get(
  '/matches',
  (req: Request, res: Response) => matchController.getAllMatchs(req, res),
);
matchRouter.patch(
  '/matches/:id/finish',
  LoginValidation.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default matchRouter;
