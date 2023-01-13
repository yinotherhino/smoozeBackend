import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
import { UserAttributes } from "../../interface";

export const paymentMethod = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user.id;
    const paystackResponse = req.body;

    if (paystackResponse === "success") {

      const updatedUser = (await UserInstance.patch(
        {
          is_premium: true,
        },
        { where: { id: id } }
      )) as unknown as UserAttributes;

      if (updatedUser) {
        const User = (await UserInstance.findOne({
          where: { id: id },
        })) as unknown as UserAttributes;
        return res.status(200).json({
          message: "Congratulations, you are now a Premium User",
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
