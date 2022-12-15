import nodemailer from 'nodemailer'
import {response} from 'express'


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
})


export const sendEmail = async (
    to: string,
    subject: string,
    html: string
) => {
    try {
        await transport.sendMail({
            from: process.env.FROM_ADMIN_EMAIL, to, subject, html

        })
        return response;
    } catch (error) {
        console.log(error);

    }
}

export const emailHtml = (email:string): string => {
    let response = `
    <div style="max-width:700px; margin:auto; border:10px solid #ddd; padding:50px 20px; font-size:110%;">
    <h2 style="text-align:center; text-transform: uppercase; color:teal;">Welcome to our Smooze App</h2>
    </div>
    `
    return response
}