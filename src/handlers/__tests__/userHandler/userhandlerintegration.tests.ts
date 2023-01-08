import request from 'supertest';
import app from "../../../server"
import { UserInstance } from '../../../model';
import { testUser } from '../../../middleware/__tests__/auth.tests';
import { GenerateSignature } from '../../../utils/auth-utils';

const user = {
    email:"smooze@gmail.com",
    userName:"smooze",
    password:"1234abcd",
    gender:"male",
    date_birth:"30-04-1982"
}
let token:string;
beforeAll(async()=>{
    await UserInstance.create(testUser)
    token = await GenerateSignature({email:testUser.email, id:testUser.id, verified:true, isLoggedIn:true})
})
afterAll(async()=>{
    await UserInstance.destroy({where: {id:testUser.id}})
    await UserInstance.destroy({where: {email:user.email}})
})
describe("/api/user/login tests",()=>{

    it('should not login unregistered users', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/login")
        .send({
            email:"smooze@unregistedemail.com",
            password:user.password,
        })
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    })

    it('should not login without email', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/login")
        .send({
            password:user.password,
        })
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    })

    it('should not login without password', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/login")
        .send({
            email:"smooze@unregistedemail.com",
        })
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    })

    it('should not login unverified users', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/login")
        .send({
            email:user.email,
            password:user.password,
        })
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    })
    
    it('should login registered users successfully', async ()=>{
        await UserInstance.create(testUser)
        const{ statusCode, body } = await request(app)
        .post("/api/user/login")
        .send({
            email:testUser.email,
            password:testUser.password,
        })
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            "message": "Login successful"
        }));
    })
})

describe("/api/user/signup tests",()=>{
    it('should not register without email', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/signup")
        .send({
            password:user.password,
        })
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    })

    it('should not register invalid data', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/signup")
        .send({
            email:user.email,
            password:user.password,
        })
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    })
    
    it('should register user with correct data successfully', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/signup")
        .send(user)
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            "message": "Login successful"
        }));
    })
})

describe("/api/user/update tests",()=>{

    it('should not update if no data is provided', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/update")
        .set("Authorization", `Bearer ${token}`)
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400
        }));
    })

    it('should update if one data is provided', async ()=>{
        token = await GenerateSignature({email:testUser.email, id:testUser.id, verified:true, isLoggedIn:true})
        const{ statusCode, body } = await request(app)
        .post("/api/user/update")
        .set("Authorization", `Bearer ${token}`)
        .send({
            email:user.email
        })
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400,
            "error": "Login successful"
        }));
    })
    
    it('should update if all data is provided', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/signup")
        .set("Authorization", `Bearer ${token}`)
        .send(user)
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            "message": "Login successful"
        }));
    })

    it('should not update if token is not provided or user is not verified', async ()=>{
        let{ statusCode, body } = await request(app)
        .post("/api/user/signup")
        .send(user)
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 200,
            "message": "Login successful"
        }));

        // { statusCode, body } = await request(app)
        // .post("/api/user/signup")
        // .send(user)
        // expect(statusCode).toEqual(404);
        // expect(body).toEqual(expect.objectContaining({
        //     "code": 200,
        //     "message": "Login successful"
        // }));
    })
})

describe("/api/user/update tests",()=>{

    it('should not update if no data is provided', async ()=>{
        const{ statusCode, body } = await request(app)
        .post("/api/user/update")
        .set("Authorization", `Bearer ${token}`)
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 400
        }));
    })
})

//changepassword
// should be able to login after changing password
// should be able to change password

//resetpassword
// should not send token as response after forgot password request