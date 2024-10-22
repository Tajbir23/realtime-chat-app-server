"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const addConnection = (userId, socketId, deviceId) => {
    console.log("device id", deviceId);
    // Check if the userId exists in connectedUsers
    if (!__1.connectedUsers[userId]) {
        // Create a new entry for the userId and deviceId with the socketId
        __1.connectedUsers[userId] = {
            [deviceId]: socketId, // Store the socketId for this deviceId
        };
    }
    else {
        const userDevices = __1.connectedUsers[userId];
        // Always update the deviceId with the new socketId
        userDevices[deviceId] = socketId; // This replaces the old socketId for the same device
    }
};
exports.default = addConnection;
