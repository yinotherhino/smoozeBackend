import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";
import { genreAttributes } from "../interface/genreAttributes";

export class genreInstance extends Model<genreAttributes> {}
genreInstance.init(
    {
        genre_id:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize:db,
        tableName:"genre"
    }
)