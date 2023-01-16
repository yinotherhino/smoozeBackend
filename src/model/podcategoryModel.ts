import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";
import { podCategoryAttributes} from "../interface/podCategoryAttribute"

export class PodcategoryInstance extends Model<podCategoryAttributes> {}
PodcategoryInstance.init(
    {
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        categoryImage:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        sequelize:db,
        tableName:"category",
    }
)