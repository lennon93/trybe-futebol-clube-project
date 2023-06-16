import { Router } from 'express';
import LoginController from '../controllers/Logincontroller';
import LoginService from '../services/LoginService';
import UserModel from '../models/UserModel';
import EncrypterService from '../services/EncrypterService';
import LoginValidation from '../middlewares/LoginValidation';

const encrypter = new EncrypterService();
const userModel = new UserModel();
const loginService = new LoginService(userModel, encrypter);
const loginController = new LoginController(loginService);
const loginRouter = Router();

loginRouter.get(
  '/login/role',
  LoginValidation.validateToken,
  (req, res) => loginController.getRole(req, res),
);
loginRouter.post(
  '/login',
  LoginValidation.validateLogin,
  (req, res) => loginController.login(req, res),
);

export default loginRouter;
