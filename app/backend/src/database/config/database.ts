/* eslint-disable import/no-import-module-exports */
import 'dotenv/config';
import { Options } from 'sequelize';
import * as mysql2 from 'mysql2';

const config: Options = {
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '123456',
  database: process.env.MYSQLDATABASE || 'railway',
  host: process.env.MYSQLHOST || 'localhost',
  port: Number(process.env.MYSQLPORT), // caso rode localmente substituir por 3002
  dialect: 'mysql',
  dialectModule: mysql2,
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};
console.log(config);
module.exports = config;
