import { NextFunction, Request, Response } from 'express';
import { LeaderBoardService } from '../services';

export default class LeaderBoard {
  private _leaderService = new LeaderBoardService();

  HomeTeam = async (_req:Request, res:Response, _next:NextFunction) => {
    const matches = await this._leaderService.HomeTeam();
    res.status(200).json(matches);
  };
}
