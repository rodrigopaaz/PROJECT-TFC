import { JwtPayload } from 'jsonwebtoken';
import Users from '../database/models/UsersModel';
import { IUser } from './interfaces';

export default class UsersService {
  private getAll = async (): Promise<IUser[]> => {
    const users = await Users.findAll();
    return users;
  };

  findUser = async (user:IUser | JwtPayload) => {
    const getUser = await Users.findOne({ where: { email: user.email } });
    return getUser;
  };
}
