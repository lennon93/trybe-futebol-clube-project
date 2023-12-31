import { NextFunction, Request, Response } from 'express';

export default class ErrorMiddleware {
  static handle(err: Error, _req: Request, res: Response, _next: NextFunction) {
    console.error(err);
    return res.status(500).end();
  }
}
