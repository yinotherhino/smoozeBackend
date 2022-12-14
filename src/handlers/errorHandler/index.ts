import express, { Request, Response, NextFunction } from "express";
export const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(error);
  res.json({ code: 500, error: error.message });
};

export const errorRouterHandler = express.Router();
errorRouterHandler.all("/*", () => {
  throw "End of Page";
});
