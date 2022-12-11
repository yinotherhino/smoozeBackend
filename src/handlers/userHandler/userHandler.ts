import { NextFunction, Request, Response } from "express";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({
    code: 200,
    data: {},
  });
};
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    res.status(200).json({
        code: 200,
        data: {},
      });
};
