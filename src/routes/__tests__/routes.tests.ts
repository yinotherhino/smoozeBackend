import request from 'supertest';
import { UserAttributes } from '../../interface';
import { testUser } from '../../middleware/__tests__/auth.tests';
import { UserInstance } from '../../model';
import app from "../../server"

describe("expects all invalid routes or request method to return 404",()=>{
    
    it('GET /api/users/login ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/user/login")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('GET /api/users/signup ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/user/signup")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('POST /api/users/update ', async ()=>{
        const{ statusCode, body } = await request(app).post("/api/user/update")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('PATCH /api/users/get-user ', async ()=>{
        const{ statusCode, body } = await request(app).patch("/api/user/get-user")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('POST /api/users/updates ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/user/updates")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('GET /api/users/logins', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/user/logins")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('GET /api/users/signups ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/user/signup")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

})

describe("valid routes tests",()=>{
    
    beforeAll(async()=>{
        const adminUser = {...testUser, role:"admin"}
        await UserInstance.create(adminUser) as unknown as UserAttributes;
    })
    it('POST /api/user/signin ', async ()=>{
        const{ statusCode, body } = await request(app).post("/api/user/signin")
        .send({email:testUser.email,password:testUser.password})
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            "code": 401,
        }));
    })

    it('POST /api/user/signup ', async ()=>{
        const{ statusCode, body } = await request(app).post("/api/user/signup")
        .send(testUser)
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            "code": 400
        }));
    })

//     it('POST /api/users/update ', async ()=>{
//         const{ statusCode, body } = await request(app).post("/api/user/update")
//         expect(statusCode).toEqual(404);
//         expect(body).toEqual(expect.objectContaining({
//             "code": 404,
//             "error": "End Of Page"
//         }));
//     })

//     it('PATCH /api/users/get-user ', async ()=>{
//         const{ statusCode, body } = await request(app).patch("/api/user/get-user")
//         expect(statusCode).toEqual(404);
//         expect(body).toEqual(expect.objectContaining({
//             "code": 404,
//             "error": "End Of Page"
//         }));
//     })

//     it('POST /api/users/updates ', async ()=>{
//         const{ statusCode, body } = await request(app).get("/api/user/updates")
//         expect(statusCode).toEqual(404);
//         expect(body).toEqual(expect.objectContaining({
//             "code": 404,
//             "error": "End Of Page"
//         }));
//     })

//     it('GET /api/users/logins', async ()=>{
//         const{ statusCode, body } = await request(app).get("/api/user/logins")
//         expect(statusCode).toEqual(404);
//         expect(body).toEqual(expect.objectContaining({
//             "code": 404,
//             "error": "End Of Page"
//         }));
//     })

//     it('GET /api/users/signups ', async ()=>{
//         const{ statusCode, body } = await request(app).get("/api/user/signup")
//         expect(statusCode).toEqual(404);
//         expect(body).toEqual(expect.objectContaining({
//             "code": 404,
//             "error": "End Of Page"
//         }));
//     })

})
