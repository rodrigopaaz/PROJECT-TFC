import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

export default class Users extends Model {
  declare id: number;
  declare username:string;
  declare role:string;
  declare email:string;
  declare password:string;
  declare inProgress:string;
}
Users.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    username: {
      allowNull: false,
      type: STRING,
    },
    role: {
      allowNull: false,
      type: STRING,
    },
    email: {
      allowNull: false,
      type: STRING,
    },
    password: {
      allowNull: false,
      type: STRING,
    },
    inProgress: {
      allowNull: false,
      type: STRING,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  },
/*   Teams.hasMany(Users, { foreignKey: 'id', as: 'home_team_id' }),
  // Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
 */
);
