export interface ITeamName{
  teamName: string
}

export interface IMatch{
  id?: number,
  homeTeamId?: string,
  homeTeamGoals?: string,
  awayTeamId?: string,
  awayTeamGoals?: string,
  inProgress?: string,
  homeTeam?: ITeamName,
  awayTeam?:ITeamName
}
