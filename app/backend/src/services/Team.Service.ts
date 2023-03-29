import Teams from '../database/models/TeamsModel';
import ITeam from './interfaces';

const getAll = async (): Promise<ITeam[]> => {
  const users = await Teams.findAll();
  return users;
};

const findById = async (id:string): Promise<ITeam[]> => {
  const users = await Teams.findByPk(id);
  if (users) return [users];
  return [];
};

const teamService = { getAll, findById };

export default teamService;
