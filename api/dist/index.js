"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cities_1 = require("./routes/cities");
const weather_1 = require("./routes/weather");
const user_1 = require("./routes/user");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// APP creating
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["https://testing-vercell.vercel.app", "http://localhost:3000"],
}));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// Routes
app.use("/api/cities", cities_1.router);
app.use("/api/weather", weather_1.router);
app.use("/api/user", user_1.router);
// Connection to DB
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => {
    // Listen for request
    app.listen(process.env.PORT, () => {
        console.log(`[api]: Connected to DB & Server is running at http://localhost:${process.env.PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
});
exports.default = app;
//# sourceMappingURL=index.js.map