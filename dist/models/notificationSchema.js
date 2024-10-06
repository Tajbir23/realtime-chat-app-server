"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    senderId: {
        type: String,
        ref: 'Users',
        required: true
    },
    receiverId: {
        type: String,
        ref: 'Users',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    postId: {
        type: String,
        required: true,
        ref: 'Day'
    }
}, { timestamps: true });
const notificationModel = (0, mongoose_1.model)('notifications', notificationSchema);
exports.default = notificationModel;
