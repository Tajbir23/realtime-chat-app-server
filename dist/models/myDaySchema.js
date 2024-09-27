"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const myDaySchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        ref: "Users",
    },
    myDay: {
        type: String,
        required: true
    },
    myDayEndAt: {
        type: Number,
        required: true
    },
    share: {
        type: Number,
        required: true
    }
});
const myDayModel = (0, mongoose_1.model)("Day", myDaySchema);
exports.default = myDayModel;
