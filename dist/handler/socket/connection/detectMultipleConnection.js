"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const detectMultipleConnection = (userId) => {
    const userDevices = __1.connectedUsers[userId];
    const deviceCount = Object.values(userDevices).length;
    if (deviceCount > 0) {
        console.log(`User ${userId} has multiple connected devices: ${deviceCount}`);
        return true;
    }
};
exports.default = detectMultipleConnection;
