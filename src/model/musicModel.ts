import { DataTypes, Model } from "sequelize";
import { MusicsAttributes } from "../interface/AdminMusicAttribute";
import { db } from "../config/db";

export class AllMusicInstance extends Model<MusicsAttributes> {}

AllMusicInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title is required" },
      },
    },
    artistId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "Artist is required" },
        notEmpty: { msg: "Artist is required" },
      },
      references: {
        model: 'artist',
        key: 'id',
      }
    },
    albumId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Album is required" },
        notEmpty: { msg: "Album is required" },
      
      }
    },
    genreId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "Genre is required" },
        notEmpty: { msg: "Genre is required" },
       }
    },
    year: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Year is required" },
        notEmpty: { msg: "Year is required" },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Image is required" },
        notEmpty: { msg: "Image is required" },
      },
    },
    songUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Song is required" },
        notEmpty: { msg: "Song is required" },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "allSongs",
    sequelize: db,
  }
);



