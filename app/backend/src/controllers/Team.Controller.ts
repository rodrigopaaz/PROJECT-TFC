import { Request, Response } from 'express';
import teamService from '../services';

const getAll = async (_req: Request, res: Response) => {
  const users = await teamService.getAll();
  return res.status(200).json(users);
};

const findById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [users] = await teamService.findById(id);
  return res.status(200).json(users);
};

const teamController = { getAll, findById };

export default teamController;
