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
const validationUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userIp = ipAddress === null || ipAddress === void 0 ? void 0 : ipAddress.toString();
    try {
        const { username, email, ip } = req.user;
        const user = yield userSchema_1.default.findOne({ username, email });
        if (!user || ip !== userIp)
            return res.status(401).send({ message: 'User not found' });
        res.send({ name: user === null || user === void 0 ? void 0 : user.name, email: user === null || user === void 0 ? void 0 : user.email, photoUrl: user === null || user === void 0 ? void 0 : user.photoUrl, username: username, isActive: user === null || user === void 0 ? void 0 : user.isActive, _id: user._id });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.default = validationUser;
