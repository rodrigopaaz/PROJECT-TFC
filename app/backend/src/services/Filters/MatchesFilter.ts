import sequelize = require('sequelize');
import Matches from '../../database/models/MatchesModel';
import Teams from '../../database/models/TeamsModel';
import { IData } from '../interfaces/ILeader';

export default class MatchesFilter {
  Matches =
  async (field:string, team:string, homeGoals:string, awayGoals:string):Promise<IData[]> => {
    const data = await Matches.findAll({
      attributes: [field, 'inProgress',
        [sequelize.fn('sum', sequelize.col(homeGoals)), 'goalsFavor'],
        [sequelize.fn('sum', sequelize.col(awayGoals)), 'goalsOwn'],
        [sequelize.fn('count', sequelize.col('home_team_id')), 'totalGames'],
        [sequelize.fn('count', sequelize.col('away_team_id')), 'totalGames'],
        [sequelize.fn('sum', sequelize.literal(`${awayGoals} > ${homeGoals}`)),
          'totalLosses'],
        [sequelize.fn('sum', sequelize.literal(`${awayGoals} = ${homeGoals}`)), 'totalDraws'],
        [sequelize.fn('sum', sequelize.literal(`${awayGoals} - ${homeGoals}`)), 'goalsBalance'],
        [sequelize.fn('sum', sequelize.literal(`${awayGoals} < ${homeGoals}`)),
          'totalVictories']],
      where: { inProgress: false },
      group: [field],
      order: [['totalVictories', 'DESC'], ['totalDraws', 'DESC'], ['goalsBalance', 'ASC'],
        ['goalsFavor', 'DESC']],
      include: [{ model: Teams, as: team }] });
    return data as unknown as IData[];
  };

  Team = async (teamID:string, teams:string, home:string, away: string) => {
    const data = await this.Matches(teamID, teams, home, away);
    const getWinner = data.map(({ dataValues }) => {
      const { totalLosses, goalsFavor, goalsOwn, homeTeam, awayTeam,
        totalDraws, totalGames, totalVictories } = dataValues;
      const name = homeTeam ? homeTeam.teamName : awayTeam.teamName;
      const totalPoints = Number(totalVictories) * 3 + Number(totalDraws) * 1;
      const efficiency = ((Number(totalPoints) / (Number(totalGames) * 3)) * 100);
      const team = { name,
        totalPoints,
        totalGames: Number(totalGames),
        totalVictories: Number(totalVictories),
        totalDraws: Number(totalDraws),
        totalLosses: Number(totalLosses),
        goalsFavor: Number(goalsFavor),
        goalsOwn: Number(goalsOwn),
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: +efficiency.toFixed(2) }; return team;
    }); return getWinner;
  };
}
