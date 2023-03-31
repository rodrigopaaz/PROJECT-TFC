import { INTEGER, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

export default class Matches extends Model {
  declare id: number;
  declare homeTeamId:string;
  declare homeTeamGoals:string;
  declare awayTeamId:string;
  declare awayTeamGoals:string;
  declare inProgress:string;
}
Matches.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeamId: {
      allowNull: false,
      type: INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },

    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamId: {
      allowNull: false,
      type: INTEGER,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: INTEGER,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },

);
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });
