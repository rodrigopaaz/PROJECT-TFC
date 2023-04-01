import sequelize = require('sequelize');
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import { IData } from './interfaces/ILeader';

export default class LeaderBoardService {
  Matches = async (field:string):Promise<IData[]> => {
    const data = await Matches.findAll({
      attributes: [field,
        [sequelize.fn('sum', sequelize.col('home_team_goals')), 'goalsFavor'],
        [sequelize.fn('sum', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.fn('count', sequelize.col('home_team_id')), 'totalGames'],
        [sequelize.fn('sum', sequelize.literal('away_team_goals > home_team_goals')),
          'totalLosses'],
        [sequelize.fn('sum', sequelize.literal('away_team_goals = home_team_goals')), 'totalDraws'],
        [sequelize.fn('sum', sequelize.literal('away_team_goals < home_team_goals')),
          'totalVictories'],
      ],
      group: [field],

      include: [
        { model: Teams, as: 'homeTeam' },
      ],
    });
    return data as unknown as IData[];
  };

  HomeTeam = async () => {
    const data = await this.Matches('homeTeamId');
    const getWinner = data.map((match) => {
      const { dataValues } = match;
      const { totalLosses, goalsFavor, goalsOwn,
        homeTeam, totalDraws, totalGames, totalVictories } = dataValues;
      const totalPoints = Number(totalVictories) * 3 + Number(totalDraws);
      const team = {
        name: homeTeam.teamName,
        totalPoints,
        totalGames,
        totalVictories: Number(totalVictories),
        totalDraws: Number(totalDraws),
        totalLosses: Number(totalLosses),
        goalsFavor: Number(goalsFavor),
        goalsOwn: Number(goalsOwn),
      }; return team;
    });

    return getWinner;
  };
}
