const request = require("supertest");
const app = require("../app");

describe("Authentication API", () => {

  const testUser = {
    name: "TestUser",
    password: "test1234"
  };

  test("User registration should work", async () => {

    const response = await request(app)
      .post("/users/register")
      .send(testUser);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("id");

    expect(response.body.name).toBe(testUser.name);

  });

  test("User login should return token", async () => {

    const response = await request(app)
      .post("/users/login")
      .send(testUser);

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("token");

  });

});

