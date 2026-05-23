const request = require("supertest");
const app = require("../app");

describe("Basic routes", () => {

  test("GET / should return status 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });

  test("GET / should return correct text", async () => {
    const response = await request(app).get("/");

    expect(response.text).toBe("test test ");
  });

  test("GET /about should return status 200", async () => {
    const response = await request(app).get("/about");

    expect(response.statusCode).toBe(200);
  });

});




