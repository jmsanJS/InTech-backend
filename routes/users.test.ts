import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import User from "../models/users";

let response: boolean | null = null;
let user: InstanceType<typeof User> | null = null;

beforeAll(async () => {
  const connectionString = process.env.CONNECTION_STRING as string;
  await mongoose.connect(connectionString, { connectTimeoutMS: 2000 });
});

afterEach(async () => {
  if (response) {
    user = await User.findOne({ email: "john.perez@example.com" });
  }
});

afterAll(async () => {
  if (response) {
    await User.findOneAndDelete({ email: "john.perez@example.com" });
  }
  await mongoose.connection.close();
});

describe("POST /users/signup", () => {
  it("should sign up a user", async () => {
    const res = await request(app).post("/users/signup").send({
      firstname: "John",
      lastname: "Perez",
      email: "john.perez@example.com",
      password: "azert123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);

    response = res.body.result;
    console.log("User signed up successfully");
  });

  describe("POST /users/signin", () => {
    it("should sign in a registered user", async () => {
      if (!response) {
        throw new Error("User not signed up");
      }

      const res = await request(app).post("/users/signin").send({
        email: "john.perez@example.com",
        password: "azert123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.result).toBe(true);
      console.log("User signed in successfully");
    });
  });
});
