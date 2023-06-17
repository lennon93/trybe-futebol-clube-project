import { NextFunction, Request, Response } from 'express';
import TokenGenerator from '../utils/TokenGenerator';

class LoginValidation {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 6 || !regex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const hasToken = TokenGenerator.verify(authorization);
    if (hasToken === 'Token must be a valid token') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    req.body.token = hasToken;
    next();
  }
}

export default LoginValidation;
