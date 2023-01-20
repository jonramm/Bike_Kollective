const request = require("supertest");
const app = require("../server/app");

describe("Test the root path status", () => {
  test("Status code 200", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the root path response", () => {
  test("Response is 'Hello World!", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.text).toBe("Hello World!");
        done();
      });
  });
});