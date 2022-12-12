import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { GenerateSignature, validatePassword } from "../../utils/auth-utils";

// export const signup = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.status(200).json({
//     code: 200,
//     data: {},
//   });
// };
// export const signin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.status(200).json({
//     code: 200,
//     data: {},
//   });
// };

/* =============LOGIN=======================. */
export const signin = async (req: Request, res: Response) => { 
  const { email, password } = req.body;
  try {
      
      const User = (await UserInstances.findOne({
          where: { email: email },
      })) as unknown as UserAttributes;

      if (!User) { 
          res.status(400).send("Invalid email or password");
      }
      const validPassword = await validatePassword(password, User.password, User.salt);
      if (!validPassword) { 
          res.status(400).send("Invalid email or password");
      }
      const payload = {
          id: User.id,
          email: User.email,
      
      }
      const signature = await GenerateSignature(payload);
      
      return res.status(201).json({
          message: "Login successful",
          signature: signature,
      })

  } catch (error) {
      res.status(500).json({
          Error: "Internal server error",
          route: "/users/signin",
        });
  }
}

/* =============UPDATE=======================. */
export const update = async (req:JwtPayload, res: Response) => { 
  const { firstName, lastName, country, password,} = req.body;
  const id=req.user.id
try {

   const User = (await UserInstances.findOne({
       where: { id: id},
   })) as unknown as UserAttributes;

   if (!User) {
       res.status(400).json({
           Error: "ou are not authorize to update your profile",
       });
   }

   const updatedUser = (await UserInstances.update(
       {
          firstName,
          lastName,
           country,
           password
       },
       { where: { id: id } }
   )) as unknown as UserAttributes;

   
   if(updatedUser){
       const User = (await UserInstances.findOne({
         where: { id: id },
       })) as unknown as UserAttributes;
 
       return res.status(200).json({
         message:"You have successfully updated your profile",
         User
       })
     }
     return res.status(400).json({
       Error: "Error occurred"
     })
} catch (error) { 
   res.status(500).json({
       Error: "Internal server error",
       route: "/users/update",
     });
}
}
