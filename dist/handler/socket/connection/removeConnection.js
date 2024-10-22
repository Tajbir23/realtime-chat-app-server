"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const removeConnection = (socketId) => {
    for (const userId in __1.connectedUsers) {
        const socketIds = __1.connectedUsers[userId];
        if (socketIds.includes(socketId)) {
            __1.connectedUsers[userId] = socketIds.filter(id => id !== socketId);
            if (__1.connectedUsers[userId].length === 0) {
                delete __1.connectedUsers[userId];
            }
            break;
        }
    }
};
exports.default = removeConnection;
