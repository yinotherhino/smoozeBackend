import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const db = new Sequelize('app', '', '', {
    storage:"./smoove.db.postgres",
    dialect: "postgres",
    logging: false
});

export const secret = process.env.JWT_SECRET as string