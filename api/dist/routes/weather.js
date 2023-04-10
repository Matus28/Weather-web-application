"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const weatherController_1 = require("../controllers/weatherController");
const requireAuth_1 = require("../middleware/requireAuth");
exports.router = express_1.default.Router();
// Check for authentication (token) = require auth for all cities routes
exports.router.use(requireAuth_1.requireAuth);
// GET weather for specific city
exports.router.get("/:location", weatherController_1.getWeatherData);
//# sourceMappingURL=weather.js.map