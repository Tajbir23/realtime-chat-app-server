"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectionSchema = new mongoose_1.Schema({
    senderId: {
        type: String,
        required: true,
        ref: "Users"
    },
    receiverId: {
        type: String,
        required: true,
        ref: "Users"
    },
    lastMessage: {
        type: String,
    },
    lastMessageAt: {
        type: Number
    },
    blockUserId: {
        type: String
    },
    isBlock: {
        type: Boolean,
        default: false,
        required: true
    },
    blockSender: {
        type: String
    },
    theme: {
        type: String,
    },
    themeUpdateBy: {
        type: String
    }
}, {
    timestamps: true
});
const connectionModel = (0, mongoose_1.model)('connections', connectionSchema);
exports.default = connectionModel;
