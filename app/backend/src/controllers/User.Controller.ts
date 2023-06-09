import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import handleToken from '../auth/jwtToken';

import UsersService from '../services/User.Service';
import IRole from './interfaces/IRole';

export default class UsersController {
  constructor(private _service = new UsersService()) { }

  findByUser = async (req: Request, res: Response) => {
    const user = req.body;
    const users = await this._service.findUser(user);
    if (users) {
      const token = handleToken.createToken(users);
      return res.status(200).json({ token });
    }
  };

  findByRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const person: string | JwtPayload = handleToken
      .validateToken(authorization || '') as { role:IRole };
    if (person) {
      return res.status(200).json({ role: person.user.role });
    }
  };
}
