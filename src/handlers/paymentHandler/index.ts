import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
import { UserAttributes, UserPayload } from "../../interface";
import { GenerateSignature } from "../../utils/auth-utils";

export const paymentMethod = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user.id;
    const paystackResponse = req.body;

    if (paystackResponse === "success") {

      const updatedUser = (await UserInstance.update(
        {
          is_premium: true,
        },
        { where: { id: id } }
      )) as unknown as UserAttributes;

      if (updatedUser) {
        const User = (await UserInstance.findOne({
          where: { id: id },
        })) as unknown as UserAttributes;

        const payload: UserPayload = {
          id: User.id,
          email: User.email,
          verified: true,
          isLoggedIn: true,
          role: User.role,
          is_premium: User.is_premium,
        };

        const signature = await GenerateSignature(payload);
        return res.status(201).json({
          message: "Congratulations, you are now a Premium User",
          signature: signature,
          User,
        });
      }

      return res.status(400).json({
        Error: "Error occured",
      });
    } else {
      return res.status(400).json({
        Error: "Your Payment Failed",
      });
    }
  } catch (err) {
    next(err);
  }
};
