import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(
    private loginService: LoginService,
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.loginService.login(email, password);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(401).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response) {
    const { authorization } = req.body;
    const { email } = authorization;
    const serviceResponse = await this.loginService.getRole(email);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(401).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
