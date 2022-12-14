import joi from "joi";
import { Request, Response, NextFunction } from "express";

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateSchema = joi.object().keys({
    firstName: joi.string(),
    lastName: joi.string(),
    address: joi.string(),
    country: joi.string(),
    password: joi.string(),
    currency: joi.string(),
    
  });
  const check = updateSchema.validate(req.body, option);
  if (check.error) {
    return res.status(400).json({ code: 400, error: check.error.message });
  } else {
    next();
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginSchema = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().regex(/^[a-z0-9]{3,30}$/),
  });
  const check = loginSchema.validate(req.body, option);
  if (check.error) {
    return res.status(400).json({ code: 400, error: check.error.message });
  } else {
    next();
  }
};

export const RegisterUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registerSchema = joi.object().keys({
    email: joi.string().email().required(),
    userName: joi.string().min(5).required(),
    gender: joi.string().required(),
    date_birth: joi.string().required(),
    password: joi
      .string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    // confirm_password: joi.any().equal(joi.ref('password')).required()
    // .label('confirm password').messages({'any.only': '{{#label}} does not match'})
  });

  const check = registerSchema.validate(req.body, option);
  if (check.error) {
    return res.status(400).json({ code: 400, error: check.error.message });
  } else {
    next();
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  let schema = joi.object({
    username: joi.string().required().min(4),
    password: joi.string().min(4).required(),
  });
  const check = schema.validate(req.body, option);
  if (check.error) {
    return res.status(400).json({ code: 400, error: check.error.message });
  } else {
    next();
  }
};
