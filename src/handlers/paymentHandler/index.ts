import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
import { UserAttributes, PremiumPayload } from "../../interface";
import { PremiumSignature } from "../../utils/auth-utils";

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

        const payload: PremiumPayload = {
          id: User.id,
          email: User.email,
          userName:User.userName,
          is_premium: User.is_premium
        };

        const signature = await PremiumSignature(payload);
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
