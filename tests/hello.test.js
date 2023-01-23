const request = require("supertest");
const app = require("../app");

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
  test("Response is 'It Worked!", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.text).toBe("It Worked!");
        done();
      });
  });
});