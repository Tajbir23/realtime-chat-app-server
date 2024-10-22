"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const removeConnection = (socketId) => {
    // Iterate over each userId in connectedUsers
    for (const userId in __1.connectedUsers) {
        const userDevices = __1.connectedUsers[userId]; // Object containing deviceId: socketId pairs
        // Iterate over the deviceIds for the current user
        for (const deviceId in userDevices) {
            // Check if the current socketId matches
            if (userDevices[deviceId] === socketId) {
                // Remove the device (i.e., remove the deviceId from connectedUsers)
                delete __1.connectedUsers[userId][deviceId];
                // If the user no longer has any connected devices, remove the user entry
                if (Object.keys(__1.connectedUsers[userId]).length === 0) {
                    delete __1.connectedUsers[userId];
                    return 0;
                }
                console.log(`Removed connection for socketId: ${socketId}`);
                return;
            }
        }
    }
    console.log(`No connection found for socketId: ${socketId}`);
};
exports.default = removeConnection;
