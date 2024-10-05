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
const generateJwt_1 = __importDefault(require("./generateJwt"));
const __1 = require("..");
const findUser_1 = __importDefault(require("./findUser"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ip = ipAddress === null || ipAddress === void 0 ? void 0 : ipAddress.toString();
    try {
        const { name, username, email, photoUrl, password } = req.body;
        const user = new userSchema_1.default({ name, username, email, photoUrl, password, ip });
        const result = yield user.save();
        const token = yield (0, generateJwt_1.default)(username, email, user._id, user.ip);
        const allUsers = yield (0, findUser_1.default)(result._id);
        __1.io.emit('users', allUsers);
        res.status(201).send({ token, name, username, email, photoUrl, _id: user._id });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});
exports.default = createUser;
