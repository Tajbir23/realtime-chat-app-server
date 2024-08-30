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
const getAllUsers_1 = __importDefault(require("./getAllUsers"));
const __1 = require("..");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, photoUrl, password } = req.body;
        const user = new userSchema_1.default({ name, username, email, photoUrl, password });
        const result = yield user.save();
        const token = yield (0, generateJwt_1.default)(username, email);
        const allUsers = yield (0, getAllUsers_1.default)(email);
        __1.io.emit('users', allUsers);
        res.status(201).send({ token, name, username, email, photoUrl });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});
exports.default = createUser;
