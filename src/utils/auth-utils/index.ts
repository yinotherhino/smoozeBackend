import jwt from 'jsonwebtoken';
import { UserPayload } from '../../model/interface';

export const GeneratePassword = async (password: string, salt: string) => {
    return  jwt.sign({password: password}, salt, {expiresIn: '2d'});
}
export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt)===savedPassword
}
export const GenerateSalt = async () => {
};

export const GenerateSignature = async(payload:UserPayload) => {
    return jwt.sign(payload, process.env.APP_SECRET!, {expiresIn: '2d'});
  }