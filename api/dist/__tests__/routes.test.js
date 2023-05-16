"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("../index"));
dotenv_1.default.config();
let auth = { token: "" };
let defaultCity;
let adminToken = "";
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI || "");
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("test user routes", () => {
    test("removes user if already exist (before creating in the next test)", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/login")
            .send({
            email: "admin@gmail.com",
            password: "Admin123!",
        })
            .expect(200)
            .end((err, res) => {
            if (err)
                done(err);
            const tokenAdmin = res.body.token;
            (0, supertest_1.default)(index_1.default)
                .delete("/api/user")
                .set({ Authorization: `Bearer ${tokenAdmin}` })
                .send({
                email: "newTest@gmail.com",
            })
                .end((error, response) => {
                if (error)
                    done(error);
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    test("creates new user", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/signup")
            .send({
            email: "newTest@gmail.com",
            password: "Test123!",
        })
            .end((err, res) => {
            if (err)
                done(err);
            if (res.statusCode === 400) {
                expect(res.statusCode).toBe(400);
                expect(res.body.error).toBe("Email already used.");
            }
            else {
                expect(res.statusCode).toBe(200);
                expect(res.body.email).toBe("newTest@gmail.com");
                expect(res.body.token.length).toBeGreaterThan(0);
            }
            done();
        });
    });
    test("returns error message if email is not valid", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/login")
            .send({
            email: "@gmail.com",
            password: "Test123!",
        })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("Email not found.");
            done();
        });
    });
    test("returns error message if password is not valid", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/login")
            .send({
            email: "test@gmail.com",
            password: "Test12!",
        })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("Password incorrect.");
            done();
        });
    });
    test("returns error message if email is not inserted", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/login")
            .send({
            email: "",
            password: "Test123!",
        })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("All fields must be filled.");
            done();
        });
    });
    test("returns error message if password is not inserted", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/login")
            .send({
            email: "test@gmail.com",
            password: "",
        })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("All fields must be filled.");
            done();
        });
    });
    test("returns email and token after successful login", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/login")
            .send({
            email: "test@gmail.com",
            password: "Test123!",
        })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(200);
            expect(res.body.email).toBe("test@gmail.com");
            expect(res.body.token.length).toBeGreaterThan(0);
            done();
        });
    });
    test("returns error message if email is incorrect", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/signup")
            .send({
            email: "gmail.com",
            password: "Test123!",
        })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("Email is not valid.");
            done();
        });
    });
    test("returns error message if password is incorrect", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/signup")
            .send({
            email: "test1@gmail.com",
            password: "est",
        })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("Password not strong enough.");
            done();
        });
    });
    test("returns error message if email is already used", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/signup")
            .send({
            email: "test@gmail.com",
            password: "Test123!",
        })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(409);
            expect(res.body.error).toBe("Email already used.");
            done();
        });
    });
});
describe("test cities routes", () => {
    test("should return status 401 - not authorized, when user is not loged in", (done) => {
        (0, supertest_1.default)(index_1.default)
            .get("/api/cities")
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.statusCode).toBe(401);
            done();
        });
    });
    test("successfully set user's authentication/token", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/login")
            .send({
            email: "test@gmail.com",
            password: "Test123!",
        })
            .expect(200)
            .end((err, res) => {
            auth.token = res.body.token;
            done();
        });
    });
    test("add new city Pezinok on the user's city list", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/cities")
            .set({ Authorization: `Bearer ${auth.token}` })
            .send({ cityName: "Pezinok" })
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            (0, supertest_1.default)(index_1.default)
                .get("/api/cities")
                .set({ Authorization: `Bearer ${auth.token}` })
                .expect(200)
                .end((error, response) => {
                if (error)
                    return done(error);
                expect(response.body[0].cityName).toBe("Pezinok");
                const addedCity = response.body.filter((city) => city.cityName === "Pezinok")[0];
                expect(addedCity.cityName).toBe("Pezinok");
                return done();
            });
        });
    });
    test("set new default city Pezinok", (done) => {
        (0, supertest_1.default)(index_1.default)
            .put("/api/cities/default")
            .set({ Authorization: `Bearer ${auth.token}` })
            .send({ cityName: "Pezinok", isDefault: true })
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            (0, supertest_1.default)(index_1.default)
                .get("/api/cities/default")
                .set({ Authorization: `Bearer ${auth.token}` })
                .expect(200)
                .end((err, response) => {
                if (err)
                    return done(err);
                defaultCity = response.body;
                expect(defaultCity.cityName).toBe("Pezinok");
                done();
            });
        });
    });
    test("returns list of user's cities", (done) => {
        (0, supertest_1.default)(index_1.default)
            .get("/api/cities")
            .set({ Authorization: `Bearer ${auth.token}` })
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].cityName).toEqual("Pezinok");
            done();
        });
    });
    test("removes city from user's list of cities", (done) => {
        (0, supertest_1.default)(index_1.default)
            .delete(`/api/cities/${defaultCity._id}`)
            .set({ Authorization: `Bearer ${auth.token}` })
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            expect(res.body.cityName).toBe("Pezinok");
            done();
        });
    });
    test("return default city (none)", (done) => {
        (0, supertest_1.default)(index_1.default)
            .get("/api/cities/default")
            .set({ Authorization: `Bearer ${auth.token}` })
            .end((err, res) => {
            if (err)
                return done(err);
            const body = res.body;
            expect(res.statusCode).toBe(200);
            expect(res.body).toBe(null);
            done();
        });
    });
});
describe("test weather routes", () => {
    test("returns error if user is not authenticated", (done) => {
        (0, supertest_1.default)(index_1.default)
            .get("/api/weather/Bratislava")
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(401);
            expect(res.body.error).toBe("Authorization token required.");
            done();
        });
    });
    test("returns valid user's auth token after login", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/login")
            .send({
            email: "test@gmail.com",
            password: "Test123!",
        })
            .expect(200)
            .end((err, res) => {
            auth.token = res.body.token;
            done();
        });
    });
    test("returns weather data for Bratislava city with 7 day forecast", (done) => {
        (0, supertest_1.default)(index_1.default)
            .get("/api/weather/Bratislava")
            .set({ Authorization: `Bearer ${auth.token}` })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(200);
            expect(res.body.location.country).toBe("Slovakia");
            expect(res.body.location.name).toBe("Bratislava");
            expect(res.body.forecast.forecastday.length).toBe(7);
            done();
        });
    });
    test("returns error if requested city does not exist", (done) => {
        (0, supertest_1.default)(index_1.default)
            .get("/api/weather/BratislavaTest")
            .set({ Authorization: `Bearer ${auth.token}` })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe("No matching location found.");
            done();
        });
    });
    test("returns error if city was not set", (done) => {
        (0, supertest_1.default)(index_1.default)
            .get("/api/weather")
            .set({ Authorization: `Bearer ${auth.token}` })
            .end((err, res) => {
            if (err)
                done(err);
            expect(res.statusCode).toBe(404);
            done();
        });
    });
    test("delete created user", (done) => {
        (0, supertest_1.default)(index_1.default)
            .post("/api/user/login")
            .send({
            email: "admin@gmail.com",
            password: "Admin123!",
        })
            .expect(200)
            .end((err, res) => {
            adminToken = res.body.token;
            (0, supertest_1.default)(index_1.default)
                .delete("/api/user")
                .set({ Authorization: `Bearer ${adminToken}` })
                .send({
                email: "newTest@gmail.com",
            })
                .end((err, res) => {
                if (err)
                    done(err);
                expect(res.statusCode).toBe(200);
                expect(res.body.deletedCount).toBe(1);
                done();
            });
        });
    });
});
//# sourceMappingURL=routes.test.js.map