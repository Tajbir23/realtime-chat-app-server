"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    posterId: {
        type: String,
        required: true
    },
    reactorId: {
        type: String,
        required: true
    },
    myDayId: {
        type: String,
        required: true
    },
    like: {
        type: Boolean,
    }
}, {
    timestamps: true
});
const likeModel = (0, mongoose_1.model)('reactions', likeSchema);
exports.default = likeModel;
