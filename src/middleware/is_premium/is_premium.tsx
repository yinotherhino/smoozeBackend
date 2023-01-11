import { Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserAttributes } from "../../interface";
import { UserInstance } from "../../model";

export const isPremium = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const isPremium = req.user?.is_premium;
    const { email, id } = req.user;

    if (!isPremium)
      throw { code: 401, message: "please upgrade to Premuim Account" };
    const user = (await UserInstance.findOne({
      where: {
        id: id,
        email: email,
      },
    })) as unknown as UserAttributes;
    if (!user.is_premium || user.role !== "admin")
      throw { code: 401, message: "please upgrade to Premuim Account " };
    next();
  } catch (error) {
    console.log(error);
    next({ code: 401, message: "unAuthorised access" });
  }
};
