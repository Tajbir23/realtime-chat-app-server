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
const searchUsers = (search, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userSchema_1.default.find({
            $and: [
                { email: { $ne: email } },
                {
                    $or: [
                        { name: { $regex: `^${search}`, $options: 'i' } },
                        { username: { $regex: `^${search}`, $options: 'i' } },
                        { email: { $regex: `^${search}`, $options: 'i' } }
                    ]
                }
            ]
        }).select('-password').limit(10).sort({ isActive: -1, lastActive: -1 });
        if (result.length > 0) {
            return result;
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.default = searchUsers;
