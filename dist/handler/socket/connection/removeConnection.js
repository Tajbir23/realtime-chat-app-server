"use strict";
// import { connectedUsers } from "../../..";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("../../../config/redis"));
// const removeConnection = (socketId: string) => {
//     // Iterate over each userId in connectedUsers
//     for (const userId in connectedUsers) {
//         const userDevices = connectedUsers[userId]; // Object containing deviceId: socketId pairs
//         // Iterate over the deviceIds for the current user
//         for (const deviceId in userDevices) {
//             // Check if the current socketId matches
//             if (userDevices[deviceId] === socketId) {
//                 // Remove the device (i.e., remove the deviceId from connectedUsers)
//                 delete connectedUsers[userId][deviceId];
//                 // If the user no longer has any connected devices, remove the user entry
//                 if (Object.keys(connectedUsers[userId]).length === 0) {
//                     delete connectedUsers[userId];
//                     return 0
//                 }
//                 console.log(`Removed connection for socketId: ${socketId}`);
//                 return;
//             }
//         }
//     }
//     console.log(`No connection found for socketId: ${socketId}`);
// };
// export default removeConnection;
const removeConnection = (socketId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("removeConnection", socketId);
    try {
        const keys = yield redis_1.default.keys(`user:*`);
        for (let key of keys) {
            const userDevices = yield redis_1.default.hgetall(key);
            for (const deviceId in userDevices) {
                console.log("removeConnection deviceId", deviceId);
                const userSocketId = JSON.parse(userDevices[deviceId]);
                if (userSocketId.socketId === socketId) {
                    yield redis_1.default.hdel(key, deviceId);
                    // If no more devices, remove the entire hash
                    const remainingDevices = yield redis_1.default.hlen(key);
                    console.log("removeConnection remaining devices", remainingDevices);
                    if (remainingDevices === 0) {
                        yield redis_1.default.del(key);
                        return true;
                    }
                    console.log(`Removed connection for socketId: ${socketId}`);
                    return true;
                }
            }
        }
    }
    catch (error) {
        console.log("removeConnection error", error.message);
        return false;
    }
});
exports.default = removeConnection;
