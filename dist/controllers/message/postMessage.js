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
const postMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const senderData = req.user;
    const receiver = req.body.user;
    const message = req.body.message;
    try {
        // Ensure receiver has the necessary properties
        if (!receiver || !receiver.username || !receiver.name || !receiver.email || !receiver.photoUrl) {
            throw new Error('Receiver data is incomplete');
        }
        // Find the sender in the database
        const sender = yield userSchema_1.default.findOne({ username: senderData.username });
        if (!sender) {
            throw new Error('Sender not found');
        }
        // Find an existing connection or create a new one
        const connection = yield connectionSchema_1.default.findOneAndUpdate({
            $or: [
                { senderId: sender._id, receiverId: receiver._id },
                { senderId: receiver._id, receiverId: sender._id }
            ]
        }, {}, { upsert: true, new: true, setDefaultsOnInsert: true });
        // Save the message
        const messageSave = new messageSchema_1.default({
            chatId: connection._id.toString(),
            senderName: sender.name,
            senderUsername: sender.username,
            senderEmail: sender.email,
            senderPhotoUrl: sender.photoUrl,
            receiverName: receiver.name,
            receiverUsername: receiver.username,
            receiverEmail: receiver.email,
            receiverPhotoUrl: receiver.photoUrl,
            message
        });
        const result = yield messageSave.save();
        // Emit the message event to all connected clients
        __1.io.emit("message", result);
        return res.status(201).send(result);
    }
    catch (error) {
        console.log('Error:', error.message);
        return res.status(500).send({ error: error.message });
    }
});
exports.default = postMessage;
