"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const findSocketIdById = (id) => {
    if (__1.connectedUsers[id]) {
        return __1.connectedUsers[id];
    }
    return [];
};
exports.default = findSocketIdById;
