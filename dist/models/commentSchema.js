"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    posterId: {
        type: String,
        required: true,
        ref: "Users"
    },
    myDayId: {
        type: String,
        required: true,
        ref: "Day"
    },
    comment: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true,
        ref: "Users"
    }
}, {
    timestamps: true
});
const commentModel = (0, mongoose_1.model)('comments', commentSchema);
exports.default = commentModel;
