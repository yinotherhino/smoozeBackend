import { DataTypes, Model } from "sequelize";
import {db} from "../db/index";
// import { patientInstance } from "../model/reportModel";

export interface UserAttributes {
  id: string;
  userName: string;
  email: string; // no duplicates allowed.
 
  gender: string;
  date_birth: string;
  password: string;
}


export class UserInstance extends Model<UserAttributes>{}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Full name is required",
        },
        notEmpty: {
          msg: "Provide the full name",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email is required",
        },
        isEmail: {
          msg: "Provide the valid email",
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_birth: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: "Users",
  }
);

