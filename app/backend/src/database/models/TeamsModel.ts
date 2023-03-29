import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';
import Matches from './MatchesModel';

export default class Teams extends Model {
  declare id: number;
  declare teamName:string;
}
Teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'id', as: 'home_team_id' });
Teams.hasMany(Matches, { foreignKey: 'id', as: 'away_team_id' });
