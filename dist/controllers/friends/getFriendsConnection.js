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
const findSocketIdByEmail_1 = __importDefault(require("../findSocketIdByEmail"));
const __1 = require("../..");
const getFriendsConnectionById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the current user (your details)
        // const me = await userModel.findOne({ email });
        // if (!me) {
        //     throw new Error('User not found');
        // }
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
                const receiverEmail = friend.receiverId.email;
                delete friend.receiverId;
                const socketId = (0, findSocketIdByEmail_1.default)(receiverEmail);
                if (socketId) {
                    __1.io.to(socketId).emit("updateFriendStatus", friend);
                }
            }
            else if (friend.receiverId._id.toString() === _id) {
                const senderEmail = friend.senderId.email;
                delete friend.senderId;
                const socketId = (0, findSocketIdByEmail_1.default)(senderEmail);
                if (socketId) {
                    __1.io.to(socketId).emit("updateFriendStatus", friend);
                }
            }
        });
    }
    catch (error) {
        console.error("Error in getFriendsConnectionById:", error);
    }
});
exports.default = getFriendsConnectionById;
