import { Sequelize } from "sequelize";
import { DATABASE_ENVIROMENT } from "./app.enviroment";

export const sequelize = new Sequelize({
  host: DATABASE_ENVIROMENT.HOST,
  username: DATABASE_ENVIROMENT.USERNAME,
  password: DATABASE_ENVIROMENT.PASSWORD,
  database: DATABASE_ENVIROMENT.DATABASE,
  dialect: 'mysql',
});
