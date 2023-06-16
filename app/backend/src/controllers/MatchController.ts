import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const ServiceResponse = await this.matchService.getAllMatchs();
      return res.status(200).json(ServiceResponse.data);
    }

    const ServiceResponse = await this.matchService.getAllMatchs(inProgress === 'true');
    return res.status(200).json(ServiceResponse.data);
  }
}
