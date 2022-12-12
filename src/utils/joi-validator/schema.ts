import joi from "joi";
import { NextFunction, Request, Response } from "express";

// export your route validations middlleware here

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
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



export const updateUser = async (req: Request, res: Response,next:NextFunction) => {
    
const updateSchema=joi.object().keys({
    firstName:joi.string(),
    lastName:joi.string(),
    phone:joi.string()
  
})
const check = updateSchema.validate(req.body, option);
if (check.error) {
  return res.status(400).json({ code: 400, error: check.error.message });
} else {
  next();
}

};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => { 

    const loginSchema=joi.object().keys({
  
        email: joi.string().required(),
        password: joi.string().regex(/^[a-z0-9]{3,30}$/),  
       
     })
     const check = loginSchema.validate(req.body, option);
     if (check.error) {
       return res.status(400).json({ code: 400, error: check.error.message });
     } else {
       next();
     }
     
};


