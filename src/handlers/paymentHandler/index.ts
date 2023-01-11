import {Response, NextFunction} from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
import { UserAttributes } from "../../interface";


export const paymentMethod = async(req: JwtPayload, res:Response, next: NextFunction) => {
    try{
        const id = req.user.id;
        const paystackResponse = req.body;
        
        if(paystackResponse === "success"){
            const updatedUser = await UserInstance.patch(
                {
                    is_premium: true

                }, {where: {id:id}}) as unknown as UserAttributes
   
                if(updatedUser){
                    const User = await UserInstance.findOne({where: {id: id}}) as unknown as UserAttributes
                    return res.status(200).json({
                        Error:"Congratulations, you are now a Premium User",
                        User
                    })
                }

                return res.status(400).json({
                    Error:"Error occured"
                })

        }else{
            return res.status(400).json({
                Error:"Your Payment Failed"
            })
        }
        
    } catch (err) {
        next(err);
      }
}







// import * as fs from 'fs';

// let amount: any;
// const params = JSON.stringify({
//   name: 'Monthly Retainer',
//   interval: 'monthly',
//   amount: amount * 100,
//   invoice_limit: 0
// });

// const options: https.RequestOptions = {
//   hostname: 'api.paystack.co',
//   port: 443,
//   path: '/plan',
//   method: 'POST',
//   headers: {
//     Authorization: process.env.SECRET_KEY,
//     'Content-Type': 'application/json',
//   },
// };

// let req = https.request(options, (res) => {
//   var data = '';

//   res.on('data', (chunk) => {
//     data += chunk;
//   });

//   res.on('end', () => {
//     console.log(JSON.parse(data));
//   });
// }).on('error', (error) => {


// //let myplan = JSON.parse($data, true);
// let myplan: any;          //I used this line to make myplan become global variable, so that plan under params can make use of it

// fs.readFile('file.json', (err, data) => {
//     if (err) throw err;

//     myplan = JSON.parse(data.toString());
// });
       
// const params = JSON.stringify({
//   email: 'customer@email.com',
//   amount: amount * 100,
//   plan: myplan['plan_code'],
// });

// const options: https.RequestOptions = {
//   hostname: 'api.paystack.co',
//   port: 443,
//   path: '/transaction/initialize',
//   method: 'POST',
//   headers: {
//     Authorization: process.env.SECRET_KEY,
//     'Content-Type': 'application/json',
//   },
// };

// const req = https.request(options, (res) => {
//   let data = '';

//   res.on('data', (chunk) => {
//     data += chunk;
//   });

//   res.on('end', () => {
//     console.log(JSON.parse(data));
//   });
// }).on('error', (error) => {
//   console.error(error);
// });

// req.write(params);
// req.end();

// });

// req.write(params);
// req.end();
