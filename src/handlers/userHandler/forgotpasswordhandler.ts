import { Request, Response } from 'express';
import nodemailer from 'nodemailer'
// import { userInfo } from 'os';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { UserInstance } from '../../model/userModel';
import { UserAttributes } from '../../interface';
import bcrypt from 'bcrypt';
dotenv.config(); 



 export const forgotPassword = async (req: Request, res: Response) => {
    console.log("hello")
    try{
        const {email} = req.body;

        const user = await UserInstance.findOne({where: {email:email}}) as unknown as UserAttributes

        if (!user) {
            return res.json({ status: "User Not Exists!!" });
        }

        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign({ email: user.email, id: user.id }, secret, {
                    expiresIn: "1d",
                  });
        const link = `http://localhost:5000/reset-password/${user.id}/${token}`;
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
            });

            let mailOptions = {
                from: "ajiriosiobe@gmail.com",
                to: email,
                subject: "Password Reset",
                text: link,
              }
          
              transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
        res.status(200).json({ status: "Email Sent!!" });

    }catch(err){
        res.status(500).json({
            err,
            "message": "internal server error",
            "routers": "/"
        })
    }


}

/** ========== ResetPassword ============ */

export const resetPassword = async (req: Request, res: Response) => { 
    try{
        const {id, token} = req.params;
        const {password} = req.body;
        const user = await UserInstance.findOne({where: {id:id}}) as unknown as UserAttributes
        if (!user) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = process.env.JWT_SECRET + user.password;
        const payload = jwt.verify(token, secret) as unknown as UserAttributes;
        if (payload.id === user.id) {
            const hashPassword = await bcrypt.hash(password, 10);
            await UserInstance.update
            ({password:hashPassword}, {where: {id:id}})
        }
        res.status(200).json({ status: "Password Updated!!" });
    }catch(err){
        res.status(500).json({
            err,
            "message": "internal server error",
            "routers": "/"
        })
    }
}

