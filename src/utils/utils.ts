import Joi from 'joi';
import Jwt from 'jsonwebtoken';
import { userPayload } from '../interface/users.dto';
import { secret } from '../db'

export const registerSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    userName : Joi.string().min(5).required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required()
    .label('confirm password').messages({'any.only': '{{#label}} does not match'})
})
    

export const generateToken = (payload: userPayload) => {
    return Jwt.sign(payload, secret, {expiresIn: '1d'});
}

export const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };


