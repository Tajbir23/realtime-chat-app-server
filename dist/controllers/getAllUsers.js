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
const getAllUsers = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("user", email)
    try {
        const users = yield userSchema_1.default.find(email ? { email } : {});
        // console.log("users",users)
        return users.map((user) => ({ name: user.name, username: user.username, email: user.email, photoUrl: user.photoUrl, isActive: user.isActive, _id: user._id }));
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = getAllUsers;
