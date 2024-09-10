"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const findSocketIdByEmail = (email) => {
    for (let [socketId, storedEmail] of __1.connectedUsers.entries()) {
        if (storedEmail === email) {
            return socketId;
        }
    }
};
exports.default = findSocketIdByEmail;
