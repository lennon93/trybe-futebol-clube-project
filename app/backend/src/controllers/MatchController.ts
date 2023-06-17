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
    if (!serviceResponse || serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(404).json({ message: 'Match not found' });
    }

    return res.status(200).json({ message: 'Finished' });
  }
}
