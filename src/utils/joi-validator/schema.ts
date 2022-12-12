// import joi from "joi";
// import { Request, Response } from "express";

// export your route validations middlleware here

// export const option = {
//   abortEarly: false,
//   errors: {
//     wrap: {
//       label: "",
//     },
//   },
// };

// export const createUser = async (
//   req: Request,
//   res: Response,
//   next: Function
// ) => {
//   let schema = joi.object({
//     username: joi.string().required().min(4),
//     password: joi.string().min(4).required(),
//   });
//   const check = schema.validate(req.body, option);
//   if (check.error) {
//     return res.status(400).json({ code: 400, error: check.error.message });
//   } else {
//     next();
//   }
// };
