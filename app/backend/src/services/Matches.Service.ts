import { ModelStatic, Op } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import { IMatch } from './interfaces';

export default class MatchsService {
  private _model: ModelStatic<Matches> = Matches;

  CreateMatch = async (user:IMatch): Promise<IMatch[]> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress = 1 } = user;
    const users = await Matches.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    });
    return [users] || '';
  };

  public async FilteredMatches(query:IMatch): Promise<IMatch[]> {
    const { inProgress } = query;
    const bool = () => {
      switch (inProgress) {
        case 'true': return 1;
        case 'false': return 0;
        default: return '';
      }
    };
    const result = await this._model.findAll({
      where: { [Op.or]: {
        inProgress: { [Op.like]: `%${bool()}%`,
        } } },
      include: [
        { model: Teams, as: 'homeTeam' },
        { model: Teams, as: 'awayTeam' },
      ],
    });
    return result;
  }

  FinishMatch = async (id:string): Promise<IMatch[]> => {
    const users = await Matches.update({ inProgress: false }, {
      where: { id },
    });
    return users as IMatch[] || '';
  };

  UpdateMatch = async (
    id:string,
    homeTeamGoals:string,
    awayTeamGoals:string,
  ): Promise<IMatch[]> => {
    const users = await Matches.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
    return users as IMatch[] || '';
  };
}
