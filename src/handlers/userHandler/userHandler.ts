import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
import {
  GenerateSalt,
  GenerateSignature,
  // validatePassword,
  GeneratePassword,
  validatePassword,
} from "../../utils/auth-utils";
import nodemailer from "nodemailer";
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
      throw new Error("Invalid email or password");
    } else {
      //validate password
      const validPassword = await validatePassword(
        password,
        User.password,
        User.salt
      );
      console.log(validPassword);
      if (!validPassword) throw new Error("Invalid email or password");

      const payload = {
        id: User.id,
        email: User.email,
        verified: User.verified,
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
  const { firstName, lastName, country, password, address, currency } =
    req.body;
  const id = req.user.id;
  try {
    const User = (await UserInstance.findOne({
      where: { id: id },
    })) as unknown as UserAttributes;

    if (!User) throw new Error("not Authorised");
    const updatedUser = (await UserInstance.update(
      {
        firstName,
        lastName,
        country,
        password,
        address,
        currency,
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
    throw new Error("Error occurred");
  } catch (error) {
    next(error);
  }
};


/*================= forgot Password ================*/
export const forgotPassword = async (req: Request, res: Response) => {
  console.log("hello")
  try{
      const {email} = req.body;

      const user = await UserInstance.findOne({where: {email:email}}) as unknown as UserAttributes

      if (!user) {
        throw new Error("User Not Exist")
          // return res.json({ status: "User Not Exists!!" });
      }

      // const secret = process.env.JWT_SECRET + user.password;
      // const token = jwt.sign({ email: user.email, id: user.id }, secret, {
      //             expiresIn: "1d",
      //           });
     let token = GenerateSignature({
       
        email: user.email,
        id: user.id,

      })


      const link = `http://localhost:5000/reset-password/${user.id}/${token}`;
      let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS,
          },
          tls: {
              rejectUnauthorized: false
          }
          });

          let mailOptions = {
              from: "ajiriosiobe@gmail.com",
              to: email,
              subject: "Password Reset",
              text: link,
            }
        
            transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
      res.status(200).json({ status: "Email Sent!!" });

  }catch(err){
    // next(err)
      res.status(500).json({
          err,
          "message": "internal server error",
          "routers": "/"
      })
  }
}