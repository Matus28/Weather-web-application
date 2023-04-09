"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const cityController_1 = require("../controllers/cityController");
const requireAuth_1 = require("../middleware/requireAuth");
exports.router = express_1.default.Router();
// Check for authentication (token) = require auth for all cities routes
exports.router.use(requireAuth_1.requireAuth);
// GET all saved cities
exports.router.get("/", cityController_1.getCities);
// GET user's default city
exports.router.get("/default", cityController_1.getDefaultCity);
// POST new city
exports.router.post("/", cityController_1.addCity);
// PUT = set default city
exports.router.put("/default", cityController_1.setDefaultCity);
// DELETE city from list
exports.router.delete("/:id", cityController_1.deleteCity);
//# sourceMappingURL=cities.js.map