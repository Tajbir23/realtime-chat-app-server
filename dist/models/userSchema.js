"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, 'username must be provided'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        unique: true,
    },
    photoUrl: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        minlength: 8,
        maxlength: 200
    }
});
userSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} to be unique.' });
const userModel = (0, mongoose_1.model)('Users', userSchema);
exports.default = userModel;
