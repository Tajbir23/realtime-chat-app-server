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
// const addConnection = (userId: string, socketId: string, deviceId: string) => {
//     console.log("device id", deviceId)
//     if (!connectedUsers[userId]) {
//         connectedUsers[userId] = {
//             [deviceId]: socketId,
//         };
//     } else {
//         const userDevices = connectedUsers[userId];
//         userDevices[deviceId] = socketId;
//     }
// };
// export default addConnection;
const addConnection = (userId, socketId, deviceId, clientIp) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("addConnection socket id", socketId);
    try {
        yield redis_1.default.hset(`user:${userId}`, deviceId, JSON.stringify({ socketId, clientIp }));
        // console.log(`${userId} connected with ${deviceId} and ip ${clientIp}`)
    }
    catch (error) {
        console.log(error);
        console.log(error.message);
    }
});
exports.default = addConnection;
