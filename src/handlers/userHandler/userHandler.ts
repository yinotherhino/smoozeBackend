import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
import {
  GenerateSalt,
  GenerateSignature,
  validatePassword,
  GeneratePassword,
} from "../../utils/auth-utils";
import { UserAttributes } from "../../interface";
import { v4 as UUID } from "uuid";

/* =============SIGNUP=======================. */

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, userName, password, gender, date_birth } = req.body;
    const uuiduser = UUID();

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);
    //check if user already exists using key value pairs in the object
    const userCheck = await UserInstance.findOne({ where: { email: email } });

    //Create User
    if (!userCheck) {
      let newUser = (await UserInstance.create({
        id: uuiduser,
        email,
        userName,
        gender,
        date_birth,
        password: userPassword,
        salt,
        verified: false,
      })) as unknown as UserAttributes;
      const token = await GenerateSignature({
        id: newUser.id,
        email: newUser.email,
        verified: newUser.verified,
      });
      return res.status(201).json({
        message:
          "User created successfully, check your email to activate you account",
        token,
      });
    } else {
      //User already exists
      throw new Error("User already exists");
    }
  } catch (err) {
    next(err);
  }
};

/* =============LOGIN=======================. */
export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const User = (await UserInstance.findOne({
      where: { email: email },
    })) as unknown as UserAttributes;

    if (!User) {
      res.status(400).send("Invalid email or password");
    }
    const validPassword = await validatePassword(
      password,
      User.password,
      User.salt
    );
    if (!validPassword) {
      res.status(400).send("Invalid email or password");
    }
    const payload = {
      id: User.id,
      email: User.email,
    };
    const signature = await GenerateSignature(payload);

    return res.status(201).json({
      message: "Login successful",
      signature: signature,
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal server error",
      route: "/users/signin",
    });
  }
};

/* =============UPDATE=======================. */
export const update = async (req: JwtPayload, res: Response) => {
  const { firstName, lastName, country, password } = req.body;
  const id = req.user.id;
  try {
    const User = (await UserInstance.findOne({
      where: { id: id },
    })) as unknown as UserAttributes;

    if (!User) {
      res.status(400).json({
        Error: "ou are not authorize to update your profile",
      });
    }

    const updatedUser = (await UserInstance.update(
      {
        firstName,
        lastName,
        country,
        password,
      },
      { where: { id: id } }
    )) as unknown as UserAttributes;

    if (updatedUser) {
      const User = (await UserInstance.findOne({
        where: { id: id },
      })) as unknown as UserAttributes;

      return res.status(200).json({
        message: "You have successfully updated your profile",
        User,
      });
    }
    return res.status(400).json({
      Error: "Error occurred",
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal server error",
      route: "/users/update",
    });
  }
};
