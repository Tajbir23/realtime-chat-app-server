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
const uuid_1 = require("uuid");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // const ip = ipAddress?.toString()
    const uid = (0, uuid_1.v4)();
    console.log("new login ", uid);
    try {
        // const user = await userModel.findOneAndUpdate({email, password}, {ip: ip}).select('-password');
        const user = yield userSchema_1.default.findOne({ email, password }).select('-password');
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // const token = await generateJwt(user.username, user.email, user._id, user.ip)
        const token = yield (0, generateJwt_1.default)(user.username, user.email, user._id);
        res.send({ token, username: user.username, email: user.email, photoUrl: user.photoUrl, name: user.name, _id: user._id, uid });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.default = loginUser;
