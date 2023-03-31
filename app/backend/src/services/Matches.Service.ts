import { ModelStatic, Op } from 'sequelize';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import { IMatch } from './interfaces';

export default class MatchsService {
  private _model: ModelStatic<Matches> = Matches;

  public async GetMatchesNoFilter(query:IMatch): Promise<IMatch[]> {
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

  findById = async (id:string): Promise<IMatch[]> => {
    const users = await Matches.findByPk(id);
    if (users) return [users];
    return [];
  };
}
