import { DataTypes, Model } from "sequelize";
import { db } from "../config/db";

// export interface UserAttributes {
//   id: string;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   salt: string;
//   address: string;
//   phone: string;
//   otp?: number;
//   otp_expiry?: Date;
//   lng: number;
//   lat: number;
//   verified: boolean;
//   role: string
//   profileImage: string
//   gender: string,
//   date_birth: Date,
//   // createdAt: Date,
//   country?: string,
//   lan: string,
//   currency?: string,
//   isAceptedPrivacy?: boolean,
//   isAceptedTerms?: boolean,
//   socials?:Array<String>
  
// }
import {UserAttributes} from './interface/UserAttributes'
export class UserInstance extends Model<UserAttributes> {}
UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   notNull: {
      //     msg: "Email is required",
      //   },
      //   isEmail: {
      //     msg: "Email is invalid",
      //   },
      // },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: "Password is required",
      //   },
      //   notEmpty: {
      //     msg: "Password is required",
      //   },
      // },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: "Gender is required",
      //   },
      //   notEmpty: {
      //     msg: "Gender is required",
      //   },
      // },
    },
    date_birth: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: "date of birth is required",
      //   },
      //   notEmpty: {
      //     msg: "date of birth is required",
      //   },
      // },
      
    },
    isAceptedPrivacy: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    otp: {
      type: DataTypes.NUMBER,
      allowNull: true,
      // validate: {
      //   notNull: {
      //     msg: "OTP is required",
      //   },
      //   notEmpty: {
      //     msg: "provide an OTP",
      //   },
      // },
    },
    otp_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
      // validate: {
      //   notNull: {
      //     msg: "OTP expiry is required",
      //   },
      // },
    },
    country: {
      type: DataTypes.STRING,
    },
    lng: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    lat: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    //   validate: {
    //     notNull: {
    //       msg: "Verification status is required",
    //     },
    //     notEmpty: {
    //       msg: "user not verified",
    //     },
    //   },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true  
  },
  lan:{
    type: DataTypes.STRING,
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAceptedTerms: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  socials: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },

},
  {
    sequelize: db,
    tableName: "user",
  }
);
