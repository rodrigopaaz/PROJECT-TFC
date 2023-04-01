export interface ILeader extends ITeamName{
  homeTeamId: number,
  goalsFavor: number,
  goalsOwn: number,
  awayTeamGoals: string,
  totalGames: string,
  totalPoints:string,
  homeTeam: ITeamName
  awayTeam: ITeamName,
  totalVictories: string,
  totalDraws:string,
  totalLosses:string
}

export interface IData{
  dataValues: ILeader
}

interface ITeamName {
  id?: string,
  teamName?: string
}
