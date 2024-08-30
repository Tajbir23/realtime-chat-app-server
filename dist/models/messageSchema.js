"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    chatId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    senderUsername: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    senderPhotoUrl: {
        type: String,
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    receiverUsername: {
        type: String,
        required: true
    },
    receiverEmail: {
        type: String,
        required: true
    },
    receiverPhotoUrl: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
});
const messageModel = (0, mongoose_1.model)('conversation', messageSchema);
exports.default = messageModel;
