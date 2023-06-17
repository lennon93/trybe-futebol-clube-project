import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();
const matchRouter = Router();

matchRouter.post(
  '/matches',
  Validations.validateToken,
  Validations.validateMatchs,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);
matchRouter.get(
  '/matches',
  (req: Request, res: Response) => matchController.getAllMatchs(req, res),
);
matchRouter.patch(
  '/matches/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);
matchRouter.patch(
  '/matches/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default matchRouter;
