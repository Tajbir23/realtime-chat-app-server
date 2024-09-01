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
}, {
    timestamps: true
});
const connectionModel = (0, mongoose_1.model)('connections', connectionSchema);
exports.default = connectionModel;
