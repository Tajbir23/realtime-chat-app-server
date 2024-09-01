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
const messageSchema_1 = __importDefault(require("../../models/messageSchema"));
const getMessage = (senderUsername, receiverUsername, skip) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield messageSchema_1.default.find({
            $or: [
                {
                    senderUsername,
                    receiverUsername
                },
                {
                    senderUsername: receiverUsername,
                    receiverUsername: senderUsername
                }
            ]
        }).sort({ createdAt: -1 }).skip(skip !== null && skip !== void 0 ? skip : 0).limit(10);
        console.log("get message", senderUsername, receiverUsername);
        return message;
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = getMessage;
