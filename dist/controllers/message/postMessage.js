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
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const messageSchema_1 = __importDefault(require("../../models/messageSchema"));
const __1 = require("../..");
const getLastMsgFriend_1 = __importDefault(require("../friends/getLastMsgFriend"));
const postMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const senderData = req.user;
    const receiver = req.body.user;
    const message = req.body.message;
    try {
        // Ensure receiver has the necessary properties
        if (!receiver || !receiver.username || !receiver.name || !receiver.email || !receiver.photoUrl) {
            throw new Error('Receiver data is incomplete');
        }
        const sender = yield userSchema_1.default.findOne({ username: senderData.username });
        if (!sender) {
            throw new Error('Sender not found');
        }
        let chatId = "";
        const connection = yield connectionSchema_1.default.findOneAndUpdate({
            $or: [
                {
                    senderId: sender._id,
                    receiverId: receiver._id
                },
                {
                    senderId: receiver._id,
                    receiverId: sender._id
                }
            ]
        }, {
            lastMessage: message,
            lastMessageAt: Number(Date.now()),
        });
        console.log(connection);
        if (connection) {
            chatId = connection._id.toString();
        }
        if (!connection) {
            const createConnection = new connectionSchema_1.default({
                senderId: sender._id,
                receiverId: receiver._id,
                lastMessage: message,
                lastMessageAt: Number(Date.now()),
            });
            const { _id } = yield createConnection.save();
            chatId = _id.toString();
        }
        if (chatId) {
            const messageSave = new messageSchema_1.default({
                chatId,
                senderName: sender.name,
                senderUsername: sender.username,
                senderEmail: sender.email,
                senderPhotoUrl: sender.photoUrl,
                receiverName: receiver.name,
                receiverUsername: receiver.username,
                receiverEmail: receiver.email,
                receiverPhotoUrl: receiver.photoUrl,
                message,
            });
            const result = yield messageSave.save();
            __1.io.emit("message", result);
            yield (0, getLastMsgFriend_1.default)(receiver._id);
            return res.status(201).send(result);
        }
    }
    catch (error) {
        console.log('error', error.message);
        return res.status(500).send({ error: error.message });
    }
});
exports.default = postMessage;
