import request from 'supertest';
import app from "../server"

describe("expects server to be running",()=>{
    it('GET / ', async ()=>{
        const{ statusCode, body } = await request(app).get("/users")
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            "code": 404,
            "error": "End Of Page"
        }));
    })
})

