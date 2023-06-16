import { NextFunction, Request, Response } from 'express';

class LoginValidation {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 6 || !regex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}

export default LoginValidation;
