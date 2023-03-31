import Teams from '../database/models/TeamsModel';
import { ITeam } from './interfaces';

export default class TeamsService {
  getAll = async (): Promise<ITeam[]> => {
    const users = await Teams.findAll();
    return users;
  };

  findById = async (id:string): Promise<ITeam[]> => {
    const users = await Teams.findByPk(id);
    if (users) return [users];
    return [];
  };
}
