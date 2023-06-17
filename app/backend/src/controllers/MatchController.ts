import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const serviceResponse = await this.matchService.getAllMatchs();
      return res.status(200).json(serviceResponse.data);
    }

    const serviceResponse = await this.matchService.getAllMatchs(inProgress === 'true');
    return res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchService.finishMatch(id);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(404).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchService.updateMatch(id, req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(404).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchService.createMatch(req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(404).json(serviceResponse.data);
    }

    return res.status(201).json(serviceResponse.data);
  }
}
