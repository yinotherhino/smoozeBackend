import bcrypt from 'bcrypt';
import {Request, Response, NextFunction} from 'express';
import {v4 as UUID} from 'uuid';

// import httpStatus from 'http-status';
import {registerSchema, options, generateToken,} from '../utils/utils';

import { UserInstance, UserAttributes } from '../model/userModel';


export async function RegisterUser(req:Request, res:Response, next:NextFunction) {
 
  try{
        const userId = UUID();
        const {userName, email, phoneNumber,gender, password} = req.body;
    
        const validateResult =  registerSchema.validate(req.body, options);
        if (validateResult.error) {
          return res.status(400).json({
            Error: validateResult.error.details[0].message
          })
        }
        
        const userEmail = await UserInstance.findOne({where: {email: email}}) as unknown as UserAttributes;
          if (userEmail) {
            return res.status(400).json({message: 'Email or Phone number already exists'})
          }
        const userPhoneNumber = await UserInstance.findOne({where: {phoneNumber: phoneNumber},
          })as unknown as UserAttributes;
          if (userPhoneNumber) {
            return res.status(400).json({message: 'Email or phone number already exists'})
          };
        
        const passwordHash = await bcrypt.hash(password, 10);
          
        // console.log(passwordHash,"hello")
        if(!userEmail && !userPhoneNumber){

            
            const Users = {
                id:userId,
                userName,
                email,
                phoneNumber,
                gender,
                password: passwordHash,
                
            }
        
            const newUser = await UserInstance.create(Users);
            console.log(newUser)
            const token = generateToken({id: Users.id, email:Users.email}) as unknown as UserAttributes;
            // const token = Jwt.sign({id: newUser.id}, process.env.JWT_SECRET as string, {expiresIn: '1d'});
            //   return res.status(httpStatus.CREATED).json({token});
            return res.status(201).json({
                message: "User created successfully",
                signature: token
            });
        }
        return res.status(401).json({
            Error: 'Email or phone number already exists'
        })

      

  }catch(err){
 console.log(err)
    res.status(500).json({
        Error: 'Internal server error occured'
    })
  }

 
}
