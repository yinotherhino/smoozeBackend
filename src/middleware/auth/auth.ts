import { Response, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
// import UserInstance  from "../../model";
import { UserAttributes } from "../../interface/UserAttributes";
import config from "../../config";

export const protect = async (req: any, res: any, next: any) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

export const auth = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      return res.status(401).json({
        status: "fail",
        message: "unauthorize request, kindly login",
      });
    }

    const token = authorization.slice(7, authorization.length);
    let verified = jwt.verify(token, config.APP_SECRETE as string);

    if (!verified) {
      return res.status(401).json({
        Error: "unauthorize",
      });
    }

    const { id } = verified as JwtPayload;

    const user = (await UserInstance.findOne({
      where: { id: id },
    })) as unknown as UserAttributes;

    if (!user) {
      return res.status(401).json({
        Error: "Invalid credentials",
      });
    }
    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({
      Error: "Unauthorizsed",
    });
  }
};
