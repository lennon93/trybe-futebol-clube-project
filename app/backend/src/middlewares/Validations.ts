import { NextFunction, Request, Response } from 'express';
import TokenGenerator from '../utils/TokenGenerator';

class Validations {
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

  static validateMatchs(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}

export default Validations;
