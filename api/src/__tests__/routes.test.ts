import request, { Response } from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../index";

dotenv.config();

let auth: { token: string } = { token: "" };
let adminToken: string = "";

let defaultCity: City;

interface City {
  __v: number;
  _id: string;
  cityName: string;
  isDefault: boolean;
  userId: string;
}

interface User {
  _id: string;
  email: string;
  password: string;
  __v: number;
}

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("test user routes", () => {
  test("removes user if already exist (before creating in the next test)", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "admin@gmail.com",
        password: "Admin123!",
      })
      .expect(200)
      .end((err: Error, res: Response) => {
        if (err) done(err);
        const tokenAdmin = res.body.token;

        request(app)
          .get("/api/user")
          .set({ Authorization: `Bearer ${tokenAdmin}` })
          .end((errorGet: Error, responseGet: Response) => {
            if (errorGet) done(errorGet);

            const exist = responseGet.body.filter(
              (user: User) => user.email === "newTest@gmail.com"
            );
            if (exist.length > 0) {
              request(app)
                .delete("/api/user")
                .set({ Authorization: `Bearer ${tokenAdmin}` })
                .send({
                  email: "newTest@gmail.com",
                })
                .end((error: Error, response: Response) => {
                  if (error) done(error);

                  expect(response.statusCode).toBe(200);
                  done();
                });
            } else {
              done();
            }
          });
      });
  });

  test("creates new user", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/signup")
      .send({
        email: "newTest@gmail.com",
        password: "Test123!",
      })
      .end((err: Error, res: Response) => {
        if (err) done(err);

        if (res.statusCode === 400) {
          expect(res.statusCode).toBe(400);
          expect(res.body.error).toBe("Email already used.");
        } else {
          expect(res.statusCode).toBe(200);
          expect(res.body.email).toBe("newTest@gmail.com");
          expect(res.body.token.length).toBeGreaterThan(0);
        }

        done();
      });
  });

  test("returns error message if email is not valid", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "@gmail.com",
        password: "Test123!",
      })
      .end((err: Error, res: Response) => {
        if (err) done(err);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Email not found.");

        done();
      });
  });

  test("returns error message if password is not valid", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "test@gmail.com",
        password: "Test12!",
      })
      .end((err: Error, res: Response) => {
        if (err) done(err);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Password incorrect.");

        done();
      });
  });

  test("returns error message if email is not inserted", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "",
        password: "Test123!",
      })
      .end((err: Error, res: Response) => {
        if (err) done(err);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("All fields must be filled.");

        done();
      });
  });

  test("returns error message if password is not inserted", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "test@gmail.com",
        password: "",
      })
      .end((err: Error, res: Response) => {
        if (err) done(err);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("All fields must be filled.");

        done();
      });
  });

  test("returns email and token after successful login", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "test@gmail.com",
        password: "Test123!",
      })
      .end((err: Error, res: Response) => {
        if (err) done(err);
        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe("test@gmail.com");
        expect(res.body.token.length).toBeGreaterThan(0);

        done();
      });
  });

  test("returns error message if email is incorrect", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/signup")
      .send({
        email: "gmail.com",
        password: "Test123!",
      })
      .end((err: Error, res: Response) => {
        if (err) done(err);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Email is not valid.");

        done();
      });
  });

  test("returns error message if password is incorrect", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/signup")
      .send({
        email: "test1@gmail.com",
        password: "est",
      })
      .end((err: Error, res: Response) => {
        if (err) done(err);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Password not strong enough.");

        done();
      });
  });

  test("returns error message if email is already used", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/signup")
      .send({
        email: "test@gmail.com",
        password: "Test123!",
      })
      .end((err: Error, res: Response) => {
        if (err) done(err);
        expect(res.statusCode).toBe(409);
        expect(res.body.error).toBe("Email already used.");

        done();
      });
  });
});

describe("test cities routes", () => {
  test("should return status 401 - not authorized, when user is not loged in", (done: jest.DoneCallback) => {
    request(app)
      .get("/api/cities")
      .end((err: Error, res: Response) => {
        if (err) return done(err);

        expect(res.statusCode).toBe(401);
        done();
      });
  });

  test("successfully set user's authentication/token", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "test@gmail.com",
        password: "Test123!",
      })
      .expect(200)
      .end((err: Error, res: Response) => {
        auth.token = res.body.token;
        done();
      });
  });

  test("add new city Pezinok on the user's city list", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/cities")
      .set({ Authorization: `Bearer ${auth.token}` })
      .send({ cityName: "Pezinok" })
      .expect(200)
      .end((err: Error, res: Response) => {
        if (err) return done(err);

        request(app)
          .get("/api/cities")
          .set({ Authorization: `Bearer ${auth.token}` })
          .expect(200)
          .end((error: Error, response: Response) => {
            if (error) return done(error);
            expect(response.body[0].cityName).toBe("Pezinok");
            const addedCity: City = response.body.filter(
              (city: City) => city.cityName === "Pezinok"
            )[0];

            expect(addedCity.cityName).toBe("Pezinok");
            return done();
          });
      });
  });

  test("set new default city Pezinok", (done: jest.DoneCallback) => {
    request(app)
      .put("/api/cities/default")
      .set({ Authorization: `Bearer ${auth.token}` })
      .send({ cityName: "Pezinok", isDefault: true })
      .expect(200)
      .end((err: Error, res: Response) => {
        if (err) return done(err);

        request(app)
          .get("/api/cities/default")
          .set({ Authorization: `Bearer ${auth.token}` })
          .expect(200)
          .end((err: Error, response: Response) => {
            if (err) return done(err);

            defaultCity = response.body;
            expect(defaultCity.cityName).toBe("Pezinok");
            done();
          });
      });
  });

  test("returns list of user's cities", (done: jest.DoneCallback) => {
    request(app)
      .get("/api/cities")
      .set({ Authorization: `Bearer ${auth.token}` })
      .end((err: Error, res: Response) => {
        if (err) return done(err);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].cityName).toEqual("Pezinok");
        done();
      });
  });

  test("removes city from user's list of cities", (done: jest.DoneCallback) => {
    request(app)
      .delete(`/api/cities/${defaultCity._id}`)
      .set({ Authorization: `Bearer ${auth.token}` })
      .expect(200)
      .end((err: Error, res: Response) => {
        if (err) return done(err);

        expect(res.body.cityName).toBe("Pezinok");
        done();
      });
  });

  test("return default city (none)", (done: jest.DoneCallback) => {
    request(app)
      .get("/api/cities/default")
      .set({ Authorization: `Bearer ${auth.token}` })
      .end((err: Error, res: Response) => {
        if (err) return done(err);
        const body = res.body;

        expect(res.statusCode).toBe(200);
        expect(res.body).toBe(null);
        done();
      });
  });
});

describe("test weather routes", () => {
  test("returns error if user is not authenticated", (done: jest.DoneCallback) => {
    request(app)
      .get("/api/weather/Bratislava")
      .end((err: Error, res: Response) => {
        if (err) done(err);

        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe("Authorization token required.");
        done();
      });
  });

  test("returns valid user's auth token after login", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "test@gmail.com",
        password: "Test123!",
      })
      .expect(200)
      .end((err: Error, res: Response) => {
        auth.token = res.body.token;
        done();
      });
  });

  test("returns weather data for Bratislava city with 7 day forecast", (done: jest.DoneCallback) => {
    request(app)
      .get("/api/weather/Bratislava")
      .set({ Authorization: `Bearer ${auth.token}` })
      .end((err: Error, res: Response) => {
        if (err) done(err);

        expect(res.statusCode).toBe(200);
        expect(res.body.location.country).toBe("Slovakia");
        expect(res.body.location.name).toBe("Bratislava");
        expect(res.body.forecast.forecastday.length).toBe(7);
        done();
      });
  });

  test("returns error if requested city does not exist", (done: jest.DoneCallback) => {
    request(app)
      .get("/api/weather/BratislavaTest")
      .set({ Authorization: `Bearer ${auth.token}` })
      .end((err: Error, res: Response) => {
        if (err) done(err);

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("No matching location found.");
        done();
      });
  });

  test("returns error if city was not set", (done: jest.DoneCallback) => {
    request(app)
      .get("/api/weather")
      .set({ Authorization: `Bearer ${auth.token}` })
      .end((err: Error, res: Response) => {
        if (err) done(err);

        expect(res.statusCode).toBe(404);
        done();
      });
  });

  test("delete created user", (done: jest.DoneCallback) => {
    request(app)
      .post("/api/user/login")
      .send({
        email: "admin@gmail.com",
        password: "Admin123!",
      })
      .expect(200)
      .end((err: Error, res: Response) => {
        adminToken = res.body.token;

        request(app)
          .delete("/api/user")
          .set({ Authorization: `Bearer ${adminToken}` })
          .send({
            email: "newTest@gmail.com",
          })
          .end((err: Error, res: Response) => {
            if (err) done(err);
            expect(res.statusCode).toBe(200);

            expect(res.body.deletedCount).toBe(1);
            done();
          });
      });
  });
});
