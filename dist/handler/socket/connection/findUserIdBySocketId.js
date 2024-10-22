"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const findUserIdBySocketId = (socketId) => {
    console.log("findUserIdBySocketId", socketId);
    console.log(__1.connectedUsers);
    for (const userId in __1.connectedUsers) {
        if (__1.connectedUsers[userId].includes(socketId)) {
            return userId;
        }
    }
};
exports.default = findUserIdBySocketId;
