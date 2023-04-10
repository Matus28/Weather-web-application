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
exports.signupUser = exports.loginUser = void 0;
const userModel_1 = require("../models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.loginUser = loginUser;
// Signup user
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.User.signup(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.signupUser = signupUser;
//# sourceMappingURL=userController.js.map