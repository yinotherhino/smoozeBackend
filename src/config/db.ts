import { Sequelize } from "sequelize";
// import config from "./index";
// const { DATABASE_DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = config;
export const db = new Sequelize(
  "rtajhzcb",
  "rtajhzcb",
  "vEUxVGeppmcvGoMPCxYsryRU76SGLzy4",
  {
    host: "ruby.db.elephantsql.com",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);