import { Sequelize} from 'sequelize'
import config from "./index";
const {DATABASE_DATABASE_NAME,DATABASE_USERNAME}=config
export const db = new Sequelize(DATABASE_DATABASE_NAME,DATABASE_USERNAME, "1234", {
      host:config.DATABASE_HOST,
    port:config.DATABASE_PORT,
    dialect: 'postgres',
    logging: false
})


