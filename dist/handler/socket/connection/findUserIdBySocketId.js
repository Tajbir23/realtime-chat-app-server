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
// const findUserIdBySocketId = (socketId: string): string | undefined => {
//     console.log("findUserIdBySocketId:", socketId);
//     console.log("Connected Users:", connectedUsers);
//     // Iterate through all userIds in connectedUsers
//     for (const userId in connectedUsers) {
//         const userDevices = connectedUsers[userId]; // Object containing deviceId: socketId pairs
//         // Iterate through all deviceIds for the current user
//         for (const deviceId in userDevices) {
//             // Check if the socketId matches
//             if (userDevices[deviceId] === socketId) {
//                 return userId; // Return the userId if socketId is found
//             }
//         }
//     }
//     return undefined; // Return undefined if no user found with the socketId
// };
// export default findUserIdBySocketId;
const findUserIdBySocketId = (socketId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("findUserBySocketId", socketId);
    try {
        const keys = yield redis_1.default.keys(`user:*`);
        for (const key of keys) {
            const devices = yield redis_1.default.hgetall(key);
            for (const deviceId in devices) {
                const device = JSON.parse(devices[deviceId]);
                if (device.socketId === socketId) {
                    return key.split(":")[1];
                }
            }
        }
    }
    catch (error) {
        console.log("findUserIdBySocketId error", error.message);
    }
});
exports.default = findUserIdBySocketId;
