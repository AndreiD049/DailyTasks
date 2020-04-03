const request = require("supertest");
const app = require("../app");

let agent;

beforeAll(() => {
    // setup the agent so the test share the same session
    agent = request.agent(app);
})

describe("Testing organisation related API", () => {
    it("should create a new organisation", async () => {
        let res = await agent
            .post('/organizations/add')
            .send({
                name: "Evil. inc"
            });
        expect(res.statusCode).toBe(200);
    });

    /* 
    Rules for organisation names should be basic. No special characters
    */
    it("should fail to create an organisation without a name", async () => {
        let res = await agent
            .post("/organizations/add")
            .send({}); // sending empty object
        expect(res.statusCode).toBe(400); // Bad request
    });

})