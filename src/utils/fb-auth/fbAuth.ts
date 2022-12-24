import { Application, Request, Response } from "express";
import { v4 as UUID } from "uuid";
import { UserAttributes } from "../../interface";
import { UserInstance } from "../../model";
import { GenerateSignature } from "../auth-utils";

export const fboauth = (app:Application)=>{
    app.post("/fb-auth", async(req, res)=>{
        try{
            const {userId, accessToken, name, email, image, firstName, lastName} = req.body;
            const user = await UserInstance.findOne(
                {where:{email}}
            )
            if(user){
                return res.status(400).json({
                    Error: "User already registered, please Login."
                })
            }
            const uuiduser = UUID();
            const newUser = await UserInstance.create({
                salt:"Facebook Default",
                id:uuiduser,
                email,
                firstName,
                lastName,
                facebookId: userId,
                faceBookToken: accessToken,
                profileImage:image,
                password: "Facebook Default",
                userName: name
            })
            if(newUser){
                return res.status(201).json({
                    message:"Registration successful",
                    user: newUser
                })
            }
            return res.status(400).json({
                Error: "An error occured.",
                statusCode:400
            })
        }catch(err){
            res.status(500).json({
                Error: "An error occured.",
                statusCode:500
            })
        }
    })

    app.post("/fb-auth-login", async(req:Request, res:Response)=>{
        try {
            const {userId} = req.body;
            const user = await UserInstance.findOne({where:{facebookId: userId}}) as unknown as UserAttributes

            if(user){
                const token = GenerateSignature({id:user.facebookId, email:user.email, token: user.faceBookToken})
                return res.status(200).json({
                    message:"Login successful",
                    user,
                    token 
                })
            }
            return res.status(400).json({
                Error: "Please signup. User not found.",
                statusCode:400
            })
        } catch (error) {
            res.status(500).json({
                Error: "An error occured.",
                statusCode:500
            })
        }
    })
}