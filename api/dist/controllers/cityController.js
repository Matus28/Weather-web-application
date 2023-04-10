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
exports.deleteCity = exports.setDefaultCity = exports.addCity = exports.getDefaultCity = exports.getCities = void 0;
const cityModel_1 = require("../models/cityModel");
const mongoose_1 = __importDefault(require("mongoose"));
// GET all cities
const getCities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const cities = yield cityModel_1.City.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(cities);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.getCities = getCities;
// GET user's default city
const getDefaultCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const city = yield cityModel_1.City.findOne({ userId, isDefault: true });
        res.status(200).json(city);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.getDefaultCity = getDefaultCity;
// POST new city
const addCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cityName } = req.body;
    let isValidName = false;
    try {
        const URL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${cityName}&days=7`;
        const result = yield fetch(URL);
        const data = yield result.json();
        if (data === null || data === void 0 ? void 0 : data.error)
            throw new Error(data.error.message);
        isValidName = true;
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
            return;
        }
    }
    try {
        const userId = req.user._id;
        const exist = yield cityModel_1.City.findOne({ cityName, userId });
        const city = (yield isValidName) && !exist && cityModel_1.City.create({ cityName, userId });
        res.status(200).json(city);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.addCity = addCity;
// PUT = set default city
const setDefaultCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cityName, isDefault } = req.body;
    const userId = req.user._id;
    try {
        const result = yield cityModel_1.City.setDefaultCity(cityName, userId, isDefault);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.setDefaultCity = setDefaultCity;
// Delete city
const deleteCity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "There is not such city." });
        }
        const city = yield cityModel_1.City.findOneAndDelete({ _id: id });
        if (!city) {
            return res.status(400).json({ error: "There is not such city." });
        }
        res.status(200).json(city);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
    }
});
exports.deleteCity = deleteCity;
//# sourceMappingURL=cityController.js.map