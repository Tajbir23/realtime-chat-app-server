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
    lastMessageSeen: {
        type: Boolean
    },
    lastMessageSeenUserId: {
        type: String,
        ref: "Users"
    },
    lastMessageSender: {
        type: String,
        ref: "Users"
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
    },
    themeType: {
        type: String,
    },
    deleteFor: {
        type: String
    },
    delete: {
        type: Boolean,
        default: false,
    },
    publicKey: {
        type: String
    },
    isEncrypted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});
const connectionModel = (0, mongoose_1.model)('connections', connectionSchema);
exports.default = connectionModel;
