import { ILeader } from '../interfaces/ILeader';

const filterByRole = (element:ILeader[]) => {
  const totalPoints = element.sort((a, b) => {
    if (+a.totalPoints > +b.totalPoints) return -1;
    if (+a.totalPoints < +b.totalPoints) return 1;
    return 0;
  });

  const goalsBalance = totalPoints.sort((a, b) => {
    if (+a.totalPoints === +b.totalPoints && +a.goalsBalance > +b.goalsBalance) return -1;
    return 1;
  });

  const goalsFavor = goalsBalance.sort((a, b) => {
    if (+a.totalPoints === +b.totalPoints
      && +a.goalsBalance === +b.goalsBalance
      && +a.goalsFavor > +b.goalsFavor) return -1;
    if (+a.goalsFavor < +b.goalsFavor) return 1;
    return 0;
  });
  return goalsFavor;
};

export default filterByRole;
