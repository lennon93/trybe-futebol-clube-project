import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import UserModel from '../models/UserModel';
import EncrypterService from '../services/EncrypterService';
import Validations from '../middlewares/Validations';

const encrypter = new EncrypterService();
const userModel = new UserModel();
const loginService = new LoginService(userModel, encrypter);
const loginController = new LoginController(loginService);
const loginRouter = Router();

loginRouter.get(
  '/login/role',
  Validations.validateToken,
  (req, res) => loginController.getRole(req, res),
);
loginRouter.post(
  '/login',
  Validations.validateLogin,
  (req, res) => loginController.login(req, res),
);

export default loginRouter;
