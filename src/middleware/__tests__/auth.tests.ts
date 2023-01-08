import supertest from "supertest"
import { GenerateSignature } from "../../utils/auth-utils";
import { UserInstance } from '../../model/userModel'
import {v4 as UUID} from 'uuid'
import app from "../../server"

const email = "SMOOZE@gmail.com"
const id1=UUID()
const id2=UUID()
beforeAll(async()=>{
    try{


    await UserInstance.bulkCreate(
        [{
        id:id1,
        password:"1234abcd",
        salt:"hello",
        userName:"unverified",
        is_premium:false,
        firstName:"SMOOZE",
        lastName:"SMOOZE",
        email:"unverifiedUser@gmail.com",
        country:"Nigeria",
        gender:"male",
        verified:false,
    },
    {
        id:id2,
        password:"1234abcd",
        salt:"hello",
        userName:"Smooze",
        is_premium:false,
        firstName:"SMOOZE",
        lastName:"SMOOZE",
        email,
        country:"Nigeria",
        gender:"male",
        verified:true,
    }
])
}
catch(err:any){
    console.log(err)
}
})

afterAll(async()=>{
    await UserInstance.destroy({ where: { email:[email, "unverifiedUser@gmail.com"] } });
})

let request:supertest.SuperTest<supertest.Test> = supertest(app)
let token :string|null;
describe("auth middleware integration tests",()=>{
    const exec = () => {
        return request
        .patch('/api/user/update')
        .set("Authorization", `Bearer ${token}`)
        .trustLocalhost(true)
        .send({ 
            firstName:"SMOOZE",
            lastName:"SMOOZE",
            email:"SMOOZE@gmail.com",
            country:"Nigeria",
            gender:"male"
        })
    }

    const execNoToken = () => {
        return request
        .patch('/api/user/update')
        .trustLocalhost(true)
        .send({ 
            firstName:"SMOOZE",
            lastName:"SMOOZE",
            email:"SMOOZE@gmail.com",
            country:"Nigeria",
            gender:"male"
        })
    }
    it("should return 400 if token is not specified", async()=>{
        const response = await execNoToken();
        expect(response.status).toBe(400)
    })

    it("should return 400 if token is incorrect", async()=>{
        token = ""
        const response = await exec();
        expect(response.status).toBe(400)
    })

    it("should return 400 if token is correct but user is invalid", async()=>{
        const response = await exec();
        expect(response.status).toBe(400)
    })

    it("should return 400 if token is correct and user is valid but user is not verified", async()=>{
        token = await GenerateSignature({email:'unverifiedUser@gmail.com',id:id1,verified:false,isLoggedIn: true});
        const response = await exec();
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("Account Not Activated")
    })

    it("should return 200 if token is correct and user is valid", async()=>{
        token = await GenerateSignature({email:'SMOOZE@gmail.com',id:id2,verified:false,isLoggedIn: true});
        const response = await exec();
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("You have successfully updated your profile")
    })
})

describe("auth middleware unit tests",()=>{
    it("should generate req.user", ()=>{

    })
})