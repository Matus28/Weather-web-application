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
exports.City = exports.citySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.citySchema = new Schema({
    cityName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        required: true,
        default: false,
    },
});
// Set Default city static method
exports.citySchema.static('setDefaultCity', function (cityName, userId, isDefault) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cityName) {
            throw Error('No city selected.');
        }
        const exists = yield this.findOne({
            cityName: {
                $regex: `^${cityName}`,
                $options: 'i',
            },
            userId,
        });
        if (!exists) {
            yield this.create({ cityName, userId });
        }
        yield this.updateMany({ userId }, { $set: { isDefault: false } });
        console.log(`is default: ${isDefault}`);
        if (isDefault) {
            yield this.updateOne({
                cityName: {
                    $regex: `^${cityName}`,
                    $options: 'i',
                },
                userId,
            }, { $set: { isDefault: true } });
        }
        const result = yield this.findOne({ userId });
        return result;
    });
});
exports.City = mongoose_1.default.model('City', exports.citySchema);
//# sourceMappingURL=cityModel.js.map