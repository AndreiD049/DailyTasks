const request = require("supertest");
const app = require("../app");

let agent;

beforeAll(() => {
    // set up the agent so the tests share the same session
    agent = request.agent(app);
})

describe("testing routes and API endpoints", () => {
    it("should respond with a 200 status to any get request", async () => {
        const res = await agent 
            .get("/index123");
        console.log(res.body);
        expect(res.statusCode).toBe(200);
    })

    it("should create a user", async () => {
        const res = await agent
            .post("/users/add")
            .send({
                first_name: "Andrei",
                last_name: "Dimitrascu",
                login: "rast999",
                password: "123456",
                r_password: "123456"
            });
        expect(res.statusCode).toBe(200);
    });

    it("should fail creating the same user again", async () => {
        const res = await agent 
            .post("/users/add")
            .send({
                first_name: "Andrei",
                last_name: "Dimitrascu",
                login: "rast999",
                password: "123456",
                r_password: "123456"
            });
        expect(res.statusCode).toBe(403);
    });

    it("should login with the newly created user", async () => {
        const res = await agent 
            .post("/login")
            .send({
                username: "rast999",
                password: "123456"
            });
        cookie2 = res.headers["set-cookie"];
        expect(res.statusCode).toBe(200);
    });

    it("should login again", async () => {
        const res = await agent
            .post("/login")
            .send({
                username: "rast999",
                password: "123456"
            });
        expect(res.statusCode).toBe(200);
    });

    it("should return 200 for user is logged in:", async () => {
        const res = await agent
            .post("/users/check/login");
        expect(res.statusCode).toBe(200);
        expect(res.body["error"]).toBeUndefined();
    })

    it("should log user out", async () => {
        const res = await agent
            .post("/users/logout")
            .auth("username", "password")
            console.log(res.text);
        expect(res.statusCode).toBe(200);
    });

    it("should return 200 {error: 'User session not found'} for user is logged in:", async () => {
        const res = await agent
            .post("/users/check/login");
        expect(res.statusCode).toBe(200);
        expect(res.body["error"]).toMatch(/^user session not found.*$/i);
    })

    it("should fail logging out again", async () => {
        const res = await agent
            .post("/users/logout");
        expect(res.statusCode).toBe(500);
    });
});