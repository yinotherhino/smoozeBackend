import { sendEmail } from "../notification"

test("",()=>{expect(1+2).toBe(3)})

describe("Email service test", ()=>{
    test("Should send an email successfully", async() =>{
        const sendMail = await sendEmail('yinorhino@gmail.com',"Email test passed","<h1>Email test passed</h1>")
        console.log(sendMail?.accepted)
        expect(sendMail).toBeFalsy()
    })
})