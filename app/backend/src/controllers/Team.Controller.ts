import { Request, Response } from 'express';
import TeamsService from '../services/Team.Service';

export default class TeamsController {
  constructor(private _service = new TeamsService()) { }
  getAll = async (_req: Request, res: Response) => {
    const users = await this._service.getAll();
    return res.status(200).json(users);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [users] = await this._service.findById(id);
    return res.status(200).json(users);
  };
}
