"use strict";

const supertest = require("supertest");
const { server } = require("../src/server.js");
const mockRequest = supertest(server);

const { Users } = require("../src/models");

let user = { username: "mya", password: "test", role: "admin" };

beforeAll(async () => {
    await Users.sync({ force: true });
});
afterAll(async () => {
    await Users.drop();
});

describe("Auth Tests", () => {
    it("POST to /signup to create a new user", async () => {
        const response = await mockRequest.post("/signup").send(user);
        const userObject = response.body;
        console.log(userObject);
        expect(response.status).toBe(201);
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(user.username);
    });

    it("POST to /signin to login as a user (use basic auth)", async () => {
        const response = await mockRequest
            .post("/signin")
            .auth(user.username, user.password);

        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.user.id).toBeDefined();
        expect(userObject.user.username).toEqual(user.username);
    });
});
