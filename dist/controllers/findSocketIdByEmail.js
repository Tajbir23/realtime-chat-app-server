"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const findSocketIdByEmail = (email) => {
    for (let [socketId, userData] of __1.connectedUsers.entries()) {
        if (userData.email === email) {
            return socketId;
        }
    }
};
exports.default = findSocketIdByEmail;
