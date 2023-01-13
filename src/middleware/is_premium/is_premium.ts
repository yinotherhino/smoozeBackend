import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserAttributes } from "../../interface";
import { UserInstance } from "../../model";

export const is_premium = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const isPremium = req.user?.is_premium || req.user.role === "admin";
    const { email, id } = req.user;
    console.log(req.user);

    if (!isPremium)
      throw { code: 401, message: "please upgrade to Premuim Account !" };
    const user = (await UserInstance.findOne({
      where: {
        id: id,
        email: email,
      },
    })) as unknown as UserAttributes;

    console.log(user);
    if (user.is_premium || user.role === "admin") {
      next();
    } else {
      throw { code: 401, message: "please upgrade to Premuim Account!! " };
    }
  } catch (error) {
    console.log(error);
    next({ code: 401, message: "Not Authorised" });
  }
};
