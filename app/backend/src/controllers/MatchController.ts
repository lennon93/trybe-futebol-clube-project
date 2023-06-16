import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatchs(_req: Request, res: Response) {
    const ServiceResponse = await this.matchService.getAllMatchs();
    res.status(200).json(ServiceResponse.data);
  }
}
