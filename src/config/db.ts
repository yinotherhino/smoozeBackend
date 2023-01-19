import { Sequelize } from "sequelize";
import config from "./index";
const { DATABASE_DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD,DATABASE_HOST} = config;
export const db = new Sequelize(
  DATABASE_DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    port: 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      encrypt: true,
      ssl : {
        rejectUnauthorized: false
      }
    }
  }
);
