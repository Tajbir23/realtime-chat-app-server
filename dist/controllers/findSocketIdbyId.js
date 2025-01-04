"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const findSocketIdById = (id) => {
    // Check if the user exists in connectedUsers
    if (__1.connectedUsers[id]) {
        // Get all the socket IDs (values) associated with the user's devices (deviceId keys)
        return Object.values(__1.connectedUsers[id]); // Returns array of socket IDs
    }
    return []; // Return an empty array if no sockets found
};
exports.default = findSocketIdById;
