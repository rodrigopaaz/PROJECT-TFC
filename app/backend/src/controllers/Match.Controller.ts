import { Request, Response } from 'express';
import { IMatch } from '../services/interfaces';
import { MatchsService } from '../services';

export default class MatchesController {
  constructor(private _service = new MatchsService()) { }
  GetMatchesNoFilter = async (req: Request, res: Response) => {
    const query:IMatch = req.query || '';
    const users = await this._service
      .GetMatchesNoFilter(query) as unknown as { inProgress:boolean };
    return res.status(200).json(users);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [users] = await this._service.findById(id);
    return res.status(200).json(users);
  };
}
