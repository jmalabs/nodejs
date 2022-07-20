const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");

const userOne = {
  name: "Mike",
  email: "mike@gmail.com",
  password: "P@ssw0rd!@#",
};

beforeEach(async () => {
  // jest.mock("../src/models/user.model", () => {
  //   // Require the original module to not be mocked...
  //   const originalModule = jest.requireActual("../src/models/user.model");

  //   return {
  //     ...originalModule,
  //     deleteMany: jest.fn(),
  //     generateAuthToken: jest.fn()
  //   };
  // });
  await User.deleteMany();
  await User(userOne).save();
});

afterEach(async () => {
  // await User.deleteMany();
});

test("Should sign up a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "John",
      email: "JohnJohn@gmail.com",
      password: "P@ssw0rd",
    })
    .expect(201);
});

test("Should login new user", async () => {
  await request(app)
    .post("/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login bad credentials", async () => {
  await request(app)
    .post("/login")
    .send({
      email: userOne.email,
      password: "badpassword",
    })
    .expect(401);
});
