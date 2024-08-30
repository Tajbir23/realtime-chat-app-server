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
const userSchema_1 = __importDefault(require("../models/userSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const isValidId = yield mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValidId) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = yield userSchema_1.default.findById(id);
        res.send({ email: user === null || user === void 0 ? void 0 : user.email, isActive: user === null || user === void 0 ? void 0 : user.isActive, name: user === null || user === void 0 ? void 0 : user.name, username: user === null || user === void 0 ? void 0 : user.username, photoUrl: user === null || user === void 0 ? void 0 : user.photoUrl, _id: user === null || user === void 0 ? void 0 : user._id });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = findOne;
