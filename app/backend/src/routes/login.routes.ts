import { Request, Router, Response } from 'express';
import LoginController from '../controllers/Logincontroller';

const loginController = new LoginController();
const loginRouter = Router();

loginRouter.post('/login', (req: Request, res: Response) => loginController.login(req, res));

export default loginRouter;
