import express, { Request, Response, NextFunction } from "express";
export const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(error);
  res.json({ code: error.code, error: error.message });
};

export const errorRouterHandler = express.Router();
errorRouterHandler.all("/*", () => {
  throw { code: 404, message: "End of Page" };
});
