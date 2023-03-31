import { NextFunction, Response, Request } from 'express';
import TeamsService from '../services/Team.Service';

export default class ValidateTeams {
  constructor(private _matches = new TeamsService()) { }
  getMatches = async (id:string) => this._matches.findById(id);

  validateEqual = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const { homeTeamId, awayTeamId } = user;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  };

  validateMatch = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const { homeTeamId, awayTeamId } = user;
    const checkHomeTeam = await this.getMatches(homeTeamId);
    const checkAwayTeam = await this.getMatches(awayTeamId);
    if (!checkAwayTeam.length || !checkHomeTeam.length) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }
    next();
  };
}
