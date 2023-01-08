import request from 'supertest';
import app from "../../server"

describe("expects all invalid routes or request method to return 404",()=>{
    
    it('GET /api/users/login ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/users/login")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('GET /api/users/signup ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/users/signup")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('POST /api/users/update ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/users/update")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('PATCH /api/users/get-user ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/users/get-user")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('POST /api/users/updates ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/users/updates")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('GET /api/users/logins', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/users/logins")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

    it('GET /api/users/signups ', async ()=>{
        const{ statusCode, body } = await request(app).get("/api/users/signup")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })

})
