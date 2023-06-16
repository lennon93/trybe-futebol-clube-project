import { Router } from 'express';
import LoginController from '../controllers/Logincontroller';
import LoginService from '../services/LoginService';
import UserModel from '../models/UserModel';
import EncrypterService from '../services/EncrypterService';
import TokenService from '../services/TokenService';

const tokenGenerator = new TokenService();
const encrypter = new EncrypterService();
const userModel = new UserModel();
const loginService = new LoginService(userModel, encrypter, tokenGenerator);
const loginController = new LoginController(loginService);
const loginRouter = Router();

loginRouter.post('/login', (req, res) => loginController.login(req, res));

export default loginRouter;
