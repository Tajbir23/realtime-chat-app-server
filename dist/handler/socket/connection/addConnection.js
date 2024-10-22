"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const addConnection = (userId, socketId) => {
    // Check if the userId exists in connectedUsers
    if (!__1.connectedUsers[userId]) {
        // If not, create a new entry with the socketId in an array
        __1.connectedUsers[userId] = [socketId];
    }
    else {
        // If the userId exists, check if the socketId is already present
        if (!__1.connectedUsers[userId].includes(socketId)) {
            // If not present, add the new socketId
            __1.connectedUsers[userId].push(socketId);
        }
        else {
            // If the socketId is already stored, update the array if necessary
            // Here you can implement any update logic you want.
            // For example, you might want to refresh the socketId or simply log it.
            console.log(`Socket ID ${socketId} is already connected for user ${userId}.`);
        }
    }
    console.log("Updated connectedUsers:", __1.connectedUsers);
};
exports.default = addConnection;
