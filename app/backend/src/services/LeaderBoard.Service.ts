import sequelize = require('sequelize');
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import { IData, ILeader } from './interfaces/ILeader';
import filterByRole from './utils/SortArray';

export default class LeaderBoardService {
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

  HomeTeam = async () => {
    const getLeaderBoard = await this.Team(
      'homeTeamId',
      'homeTeam',
      'home_team_goals',
      'away_team_goals',
    );
    return getLeaderBoard;
  };

  AwayTeam = async () => {
    const getLeaderBoard = await this.Team(
      'awayTeamId',
      'awayTeam',
      'away_team_goals',
      'home_team_goals',
    );
    return getLeaderBoard;
  };

  AllTeam = async () => {
    const home = await this.HomeTeam();
    const away = await this.AwayTeam();
    const all:ILeader[] = home.map((team1) => {
      const awayTeam = away.find((team) => team.name === team1.name) || away[0];
      const efficiency = ((Number(team1.totalPoints) + Number(awayTeam.totalPoints))
      / ((Number(team1.totalGames) + Number(awayTeam.totalGames)) * 3)) * 100;
      const teams = {
        name: team1.name,
        totalPoints: team1.totalPoints + awayTeam.totalPoints,
        totalGames: team1.totalGames + awayTeam.totalGames,
        totalVictories: team1.totalVictories + awayTeam.totalVictories,
        totalDraws: team1.totalDraws + awayTeam.totalDraws,
        totalLosses: team1.totalLosses + awayTeam.totalLosses,
        goalsFavor: team1.goalsFavor + awayTeam.goalsFavor,
        goalsOwn: team1.goalsOwn + awayTeam.goalsOwn,
        goalsBalance: team1.goalsBalance + awayTeam.goalsBalance,
        efficiency: Number(efficiency.toFixed(2)) }; return teams as unknown as ILeader;
    }); return filterByRole(all);
  };
}
