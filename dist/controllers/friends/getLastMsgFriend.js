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
    const deleteObject = (key, message) => {
        delete message[key];
        console.log(message);
        return message;
    };
    const messageObject = recentMessage[0].toObject();
    // console.log(messageObject)
    const sender = messageObject.senderId;
    const receiver = messageObject.receiverId;
    const senderId = sender._id.toString();
    const receiverId = receiver._id.toString();
    if (id === senderId) {
        const updatedObject = deleteObject("receiverId", messageObject);
        console.log(updatedObject);
        __1.io.emit("recentMessage", updatedObject);
    }
    else if (id === receiverId) {
        const updatedObject = deleteObject("senderId", messageObject);
        console.log(updatedObject);
        __1.io.emit("recentMessage", updatedObject);
    }
});
exports.default = getLastMsgFriend;
