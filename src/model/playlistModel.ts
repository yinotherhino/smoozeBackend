import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";
import { playlistAttributes } from "../interface/playlistAttributes";


export class PlaylistInstance extends Model<playlistAttributes> {}
PlaylistInstance.init(
{
    id: {
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    imageUrl: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    songUrl: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    title: {
        type:DataTypes.STRING,
        allowNull:false
    },
    artist: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    genreId: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    album: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    song_duration: {
        type:DataTypes.STRING,
        allowNull:false
    },
},
{
    sequelize:db,
    tableName:"playlist"
}
)
