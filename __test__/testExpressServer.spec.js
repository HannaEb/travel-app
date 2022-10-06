const request = require("supertest");
const app = require("../src/server/app");

describe("Testing the root path", () => {
  test("Testing the GET method", () => {
    return request(app).get("/").expect(200);
  });
});
