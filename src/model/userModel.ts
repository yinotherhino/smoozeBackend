import { DataTypes, Model } from "sequelize";
import {db} from "../db/index";
// import { patientInstance } from "../model/reportModel";

export interface UserAttributes {
  id: string;
  userName: string;
  email: string; // no duplicates allowed.
  phoneNumber: string;
  gender: string;
  password: string;
}
/**
 * id:userId,
            usersName,
            email,
            phoneNumber,
            gender,
            password:
 */

export class UserInstance extends Model<UserAttributes> {}

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
    phoneNumber: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Phone number is required",
        },
        isNumeric: {
          msg: "Provide the valid phone number",
        },
      },
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

// Linking doctor to all patient report
// DoctorsInstance.hasMany(patientInstance, {
//   foreignKey: "doctorId",
//   as: "Patient Report",
// });

// patientInstance.belongsTo(DoctorsInstance, {
//   foreignKey: "doctorId",
//   as: "Doctors",
// });