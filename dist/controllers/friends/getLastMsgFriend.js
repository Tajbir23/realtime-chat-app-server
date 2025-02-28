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
const __1 = require("../..");
const connectionSchema_1 = __importDefault(require("../../models/connectionSchema"));
const findSocketIdbyId_1 = __importDefault(require("../findSocketIdbyId"));
const getLastMsgFriend = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recentMessage = yield connectionSchema_1.default.find({
        $or: [
            { senderId: id },
            { receiverId: id }
        ]
    })
        .sort({ lastMessageAt: -1 })
        .limit(1)
        .populate("senderId", "-password")
        .populate("receiverId", "-password");
    const receiverSocketId = yield (0, findSocketIdbyId_1.default)(recentMessage[0].receiverId._id);
    const senderSocketId = yield (0, findSocketIdbyId_1.default)(recentMessage[0].senderId._id);
    // io.to(receiverSocketId as string).emit("recentMessage", recentMessage)
    receiverSocketId.forEach(socketId => {
        __1.io.to(socketId).emit("recentMessage", recentMessage);
    });
    // io.to(senderSocketId as string).emit("recentMessage", recentMessage)
    senderSocketId.forEach(socketId => {
        __1.io.to(socketId).emit("recentMessage", recentMessage);
    });
});
exports.default = getLastMsgFriend;
