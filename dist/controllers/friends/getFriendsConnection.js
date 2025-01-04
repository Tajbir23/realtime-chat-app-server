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
const connectionSchema_1 = __importDefault(require("../../models/connectionSchema"));
// import userModel from "../../models/userSchema";
const __1 = require("../..");
const findSocketIdbyId_1 = __importDefault(require("../findSocketIdbyId"));
const getFriendsConnectionById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friends = yield connectionSchema_1.default
            .find({
            $or: [
                { senderId: _id }, // If you're the sender
                { receiverId: _id }, // If you're the receiver
            ],
        })
            .populate("senderId", "-password")
            .populate("receiverId", "-password")
            .lean();
        friends.forEach((friend) => {
            if (friend.senderId._id.toString() === _id) {
                // const receiverEmail = friend.receiverId.email;
                const receiverId = friend.receiverId._id.toString();
                delete friend.receiverId;
                // const socketId = findSocketIdByEmail(receiverEmail);
                const socketId = (0, findSocketIdbyId_1.default)(receiverId);
                if (socketId) {
                    socketId.forEach(id => {
                        __1.io.to(id).emit("updateFriendStatus", friend);
                    });
                }
            }
            else if (friend.receiverId._id.toString() === _id) {
                // const senderEmail = friend.senderId.email;
                const senderId = friend.senderId._id.toString();
                delete friend.senderId;
                // const socketId = findSocketIdByEmail(senderEmail);
                const socketId = (0, findSocketIdbyId_1.default)(senderId);
                if (socketId) {
                    socketId.forEach(id => {
                        __1.io.to(id).emit("updateFriendStatus", friend);
                    });
                }
            }
        });
    }
    catch (error) {
        console.error("Error in getFriendsConnectionById:", error);
    }
});
exports.default = getFriendsConnectionById;
