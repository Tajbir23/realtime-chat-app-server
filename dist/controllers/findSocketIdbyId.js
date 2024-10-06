"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const findSocketIdById = (id) => {
    for (let [socketId, userData] of __1.connectedUsers.entries()) {
        if (userData._id === id) {
            return socketId;
        }
        return undefined;
    }
};
exports.default = findSocketIdById;
