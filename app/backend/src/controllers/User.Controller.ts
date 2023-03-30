import { Request, Response } from 'express';
import { createToken } from '../auth/jwtToken';
import UsersService from '../services/User.Service';

export default class UsersController {
  constructor(private _service = new UsersService()) { }

  findByUser = async (req: Request, res: Response) => {
    const user = req.body;
    const users = await this._service.findUser(user);
    if (users) {
      const token = createToken(users);
      return res.status(200).json({ token });
    }
  };
}
