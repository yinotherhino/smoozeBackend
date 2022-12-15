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
import { sendEmail, welcomeEmail,passworTemplate } from "../../utils/notification";
import config from "../../config";
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
        isLoggedIn: false,
      });
      const temp = welcomeEmail(userName, token)
      await sendEmail(email, "Signup success", temp)

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
  const { firstName, lastName, country, password, address, currency } =
    req.body;
  const id = req.user.id;
  try {
    const User = (await UserInstance.findOne({
      where: { id: id },
    })) as unknown as UserAttributes;

    if (!User) throw { code: 401, message: "unAuthorised please Login" };
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
    throw { code: 500, message: "Something went wrong" };
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async(req: Request, res: Response, next:NextFunction) => {
  
  try {
    const { token } = req.params;
  if (token) {
    const verified = verifySignature(token)
    if (verified) {
      await UserInstance.update({
        verified: true
      },
        {
        where:{id:verified.id }
        })
      return res.status(200).json({
        message: "User verified"
      })
    }

  }
    throw { code: 401, message: "Unauthorized" };
  }
  catch (error) {
    next(error);
  }
/*================= forgot Password ================*/


export const forgotPassword = async (req: Request, res: Response) => {
  try{
      const {email} = req.body;
      const user = await UserInstance.findOne({where: {email:email}}) as unknown as UserAttributes
      if (!user) throw{ status: "Email is Incorect!!" }
      let token = await GenerateSignature({id:user.id,email,verified:user.verified,isLoggedIn:false})
      const template =  await passworTemplate(user.userName,token)
   await sendEmail(user.email,"PASSWORD RESETE",template)   
  res.status(200).json({ status: "Email Sent!!" });

  }catch(error){
  next(error)
  }


}

/** ========== ResetPassword ============ */

export const resetPassword = async (req: Request, res: Response) => { 
  try{
      const {id, token} = req.params;
      const {password} = req.body;
      const user = await UserInstance.findOne({where: {id:id}}) as unknown as UserAttributes
      if (!user) {
          return res.json({ status: "User Not Exists!!" });
      }
      // const secret = process.env.JWT_SECRET + user.password;
      // const payload = jwt.verify(token, secret) as unknown as UserAttributes;
      // if (payload.id === user.id) {
      //     const hashPassword = await bcrypt.hash(password, 10);
      //     await UserInstance.update
      //     ({password:hashPassword}, {where: {id:id}})
      // }
      res.status(200).json({ status: "Password Updated!!" });
  }catch(err){
      res.status(500).json({
          err,
          "message": "internal server error",
          "routers": "/"
      })
  }
}
