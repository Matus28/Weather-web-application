"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
exports.router = express_1.default.Router();
// Login route
exports.router.post('/login', userController_1.loginUser);
// Signup route
exports.router.post('/signup', userController_1.signupUser);
// Remove user route
exports.router.delete('/', userController_1.removeUser);
// Get user list (only avalible for admin)
exports.router.get('/', userController_1.getUsers);
//# sourceMappingURL=user.js.map