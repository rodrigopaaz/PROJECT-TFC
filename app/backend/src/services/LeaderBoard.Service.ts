import { ILeader } from './interfaces/ILeader';
import filterByRole from './utils/SortArray';
import MatchesFilter from './Filters/MatchesFilter';

export default class LeaderBoardService {
  private _filter = new MatchesFilter();

  HomeTeam = async () => {
    const getLeaderBoard = await this._filter.Team(
      'homeTeamId',
      'homeTeam',
      'home_team_goals',
      'away_team_goals',
    );
    return getLeaderBoard;
  };

  AwayTeam = async () => {
    const getLeaderBoard = await this._filter.Team(
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
