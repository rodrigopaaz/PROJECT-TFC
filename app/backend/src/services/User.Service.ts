import Users from '../database/models/UsersModel';
import { IUser } from './interfaces';

export default class UsersService {
  private getAll = async (): Promise<IUser[]> => {
    const users = await Users.findAll();
    return users;
  };

  findUser = async (user:IUser) => {
    const allUsers = await this.getAll();
    const getUser = allUsers.find((person:IUser) => person.email === user.email);
    return getUser;
  };
}
