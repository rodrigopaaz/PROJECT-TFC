import { NextFunction, Request, Response } from 'express';
import { LeaderBoardService } from '../services';

export default class LeaderBoard {
  private _leaderService = new LeaderBoardService();

  HomeTeam = async (_req:Request, res:Response, _next:NextFunction) => {
    const matches = await this._leaderService.HomeTeam();
    res.status(200).json(matches);
  };

  AwayTeam = async (_req:Request, res:Response, _next:NextFunction) => {
    const matches = await this._leaderService.AwayTeam();
    res.status(200).json(matches);
  };

  AllTeam = async (_req:Request, res:Response, _next:NextFunction) => {
    const matches = await this._leaderService.AllTeam();
    res.status(200).json(matches);
  };
}
