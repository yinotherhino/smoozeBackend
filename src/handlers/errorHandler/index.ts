import express, { Request, Response, NextFunction, Application } from "express";
export const errorRouterHandler = express.Router();
export const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  res.json({ code: 500, error: error });
};

errorRouterHandler.all("/*", () => {
  throw "End of Page";
});
