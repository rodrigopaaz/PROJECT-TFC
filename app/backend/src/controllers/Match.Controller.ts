import { Request, Response } from 'express';
import { IMatch } from '../services/interfaces';
import { MatchsService } from '../services';

export default class MatchesController {
  constructor(private _service = new MatchsService()) { }

  CreateMAtch = async (req: Request, res: Response) => {
    const user = req.body;
    const [users] = await this._service
      .CreateMatch(user);
    return res.status(201).json(users);
  };

  FilteredMatches = async (req: Request, res: Response) => {
    const query:IMatch = req.query || '';
    const users = await this._service
      .FilteredMatches(query) as unknown as { inProgress:boolean };
    return res.status(200).json(users);
  };

  FinishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._service.FinishMatch(id);
    return res.status(200).json({ message: 'Finished' });
  };

  UpdateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.UpdateMatch(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: { homeTeamGoals, awayTeamGoals } });
  };
}
