"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const addConnection = (userId, socketId, deviceId) => {
    console.log("device id", deviceId);
    if (!__1.connectedUsers[userId]) {
        __1.connectedUsers[userId] = {
            [deviceId]: socketId,
        };
    }
    else {
        const userDevices = __1.connectedUsers[userId];
        userDevices[deviceId] = socketId;
    }
};
exports.default = addConnection;
