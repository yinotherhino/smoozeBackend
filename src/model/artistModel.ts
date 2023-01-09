import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";
import { artistAttributes } from "../interface/artistAttributes";
import { AllMusicInstance } from "./musicModel";

export class ArtistInstance extends Model<artistAttributes> {}
ArtistInstance.init(
    {
        id: {
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false
        },
        name: {
            type:DataTypes.STRING,
            allowNull:false
        },
        imageUrl: {
            type:DataTypes.STRING,
            allowNull:false
        },
        instagramUrl: {
            type:DataTypes.STRING,
            allowNull:false
        },
        twitterUrl: {
            type:DataTypes.STRING,
            allowNull:false
        },
    },
    {
        sequelize:db,
        tableName:"artist"
    })

    ArtistInstance.hasMany(AllMusicInstance, {
        foreignKey: 'artistId', as: "allSongs"
      });
      AllMusicInstance.belongsTo(ArtistInstance, {
        foreignKey: 'artistId', as: "artist"
      });