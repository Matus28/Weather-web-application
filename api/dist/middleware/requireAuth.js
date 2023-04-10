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
exports.requireAuth = void 0;
const userModel_js_1 = require("../models/userModel.js");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Verify user is authenticated
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required." });
    }
    const token = authorization.split(" ")[1];
    try {
        const { _id } = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        // attach user property to request (for another middleware)
        req.user = (_a = (yield userModel_js_1.User.findOne({ _id }).select("_id"))) !== null && _a !== void 0 ? _a : "";
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Request is not authorized." });
    }
});
exports.requireAuth = requireAuth;
//# sourceMappingURL=requireAuth.js.map