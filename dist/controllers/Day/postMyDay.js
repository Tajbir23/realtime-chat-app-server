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
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const myDaySchema_1 = __importDefault(require("../../models/myDaySchema"));
const __1 = require("../..");
const getFriendsConnection_1 = __importDefault(require("../friends/getFriendsConnection"));
const postMyDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { content } = req.body;
    const myDayEndAt = Number(Date.now()) + 86400000;
    console.log(content);
    try {
        const user = yield userSchema_1.default.findByIdAndUpdate({ _id }, { myDay: content, myDayEndAt, isActiveMyDay: true }).select("-password");
        yield myDaySchema_1.default.create({ userId: _id, myDay: content, myDayEndAt });
        yield (0, getFriendsConnection_1.default)(_id);
        __1.io.emit("users", user);
        res.status(201).send({ message: "My Day added successfully" });
    }
    catch (error) {
        res.send(error.message);
    }
});
exports.default = postMyDay;
