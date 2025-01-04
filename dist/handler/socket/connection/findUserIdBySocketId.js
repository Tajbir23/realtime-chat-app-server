"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const findUserIdBySocketId = (socketId) => {
    console.log("findUserIdBySocketId:", socketId);
    console.log("Connected Users:", __1.connectedUsers);
    // Iterate through all userIds in connectedUsers
    for (const userId in __1.connectedUsers) {
        const userDevices = __1.connectedUsers[userId]; // Object containing deviceId: socketId pairs
        // Iterate through all deviceIds for the current user
        for (const deviceId in userDevices) {
            // Check if the socketId matches
            if (userDevices[deviceId] === socketId) {
                return userId; // Return the userId if socketId is found
            }
        }
    }
    return undefined; // Return undefined if no user found with the socketId
};
exports.default = findUserIdBySocketId;
