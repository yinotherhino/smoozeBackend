import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
import {
  GenerateSalt,
  GenerateSignature,
  GeneratePassword,
  validatePassword,
  verifySignature,
} from "../../utils/auth-utils";
import { UserAttributes, UserPayload } from "../../interface";
import { v4 as UUID } from "uuid";
import {
  sendEmail,
  welcomeEmail,
  passworTemplate,
} from "../../utils/notification";

/* =============SIGNUP=======================. */

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, userName, password, gender, date_birth,role} = req.body;
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
        role,
        verified: false,
      })) as unknown as UserAttributes;
      const token = await GenerateSignature({
        id: newUser.id,
        email: newUser.email,
        verified: newUser.verified,
        isLoggedIn: false,
      });
      const temp = welcomeEmail(userName, token);
      await sendEmail(email, "Signup success", temp);

      return res.status(201).json({
        message:
          "User created successfully, check your email to activate you account",
        token,
      });
    } else {
      //User already exists
      throw { code: 400, message: "User already exists" };
    }
  } catch (err) {
    next(err);
  }
};

/* =============LOGIN=======================. */
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const User = (await UserInstance.findOne({
      where: { email: email },
    })) as unknown as UserAttributes;
    if (!User) {
      throw { code: 400, message: "Invalide Email or Password" };
    } else {
      if (!User.verified) throw { code: 400, message: "Account Not Activated" };
      //validate password

      const validPassword = await validatePassword(
        password,
        User.password,
        User.salt
      );

      if (!validPassword)
        throw { code: 400, message: "Invalide Email or Password" };
      const payload: UserPayload = {
        id: User.id,
        email: User.email,
        verified: User.verified,
        isLoggedIn: true,
      };
      const signature = await GenerateSignature(payload);

      return res.status(200).json({
        message: "Login successful",
        signature: signature,
      });
    }
  } catch (error) {
    next(error);
  }
};

/* =============UPDATE=======================. */
export const update = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, country, date_birth, gender } = req.body;
  const dateOfBirth = new Date(
    Number(date_birth.slice(6)),
    Number(date_birth.slice(3, 5)),
    Number(date_birth.slice(0, 2))
  );
  const id = req.user.id;
  console.log(id);
  try {
    const User = (await UserInstance.findOne({
      where: { id: id },
    })) as unknown as UserAttributes;

    if (!User) throw { code: 401, message: "unAuthorised please Login" };
    const updatedUser = (await UserInstance.update(
      {
        firstName,
        lastName,
        email,
        country,
        gender,
        date_birth: dateOfBirth,
        profileImage: req.file ? req.file.path : undefined,
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
    throw { code: 500, message: "Something went wrong" };
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/*================= verify User ================*/
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.query.token;
    if (typeof token === "string") {
      const verified = await verifySignature(token);
      //check if user exits
      if (!verified) throw { code: 400, message: "Please Register An Account" };
      if (verified) {
        await UserInstance.update(
          {
            verified: true,
          },
          {
            where: { id: verified.id },
          }
        );
        return res.status(200).json({
          message: "Account verified Please Login !",
        });
      }
    }
    throw { code: 401, message: "Unauthorized" };
  } catch (error) {
    next(error);
  }
};

/*================= forgot Password ================*/

export const requestPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = (await UserInstance.findOne({
      where: { email: email },
    })) as unknown as UserAttributes;
    if (!user) {
      return res.status(200).json({
        code: 200,
        message: "Check Your Email to Continue !!",
      });
    } else {
      const otp = await GenerateSalt();
      let token = await GenerateSignature({
        id: user.id,
        email,
        otp,
      });
      await UserInstance.update(
        {
          otp: otp,
        },
        {
          where: { id: user.id },
        }
      );
      const template = await passworTemplate(user.userName, token);
      await sendEmail(user.email, "PASSWORD RESETE", template);
      res.status(200).json({
        code: 200,
        signature: token,
        message: "Check Your Email to Continue !!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const changepassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, password } = req.body;
    const data = await verifySignature(token);
    const { id, email, otp } = data;
    const user = await UserInstance.findOne({
      where: {
        email: email,
        otp,
      },
    });
    if (!user) throw { code: 401, message: "Not Valide" };
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);
    await UserInstance.update(
      {
        salt,
        password: userPassword,
        otp: "",
      },
      {
        where: { id: id },
      }
    );
    res
      .status(201)
      .json({ code: 201, message: "password updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user.id;
    const user = (await UserInstance.findOne({
      where: { id },
    })) as unknown as UserAttributes;
    res.status(201).json({ code: 200, user });
  } catch (err) {
    next(err);
  }
};
