"use strict";
// import { connectedUsers } from "../../.."
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
// const detectMultipleConnection = (userId: string) => {
//     const userDevices = connectedUsers[userId]
//     const deviceCount = Object.values(userDevices).length;
//     if(deviceCount > 1){
//         console.log(`User ${userId} has multiple connected devices: ${deviceCount}`);
//         return true;
//     }
// }
// export default detectMultipleConnection
const detectMultipleConnection = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use Redis hlen to get the number of devices for the user
        const deviceCount = yield redis_1.default.hlen(`user:${userId}`);
        if (deviceCount > 1) {
            console.log(`User ${userId} has multiple connected devices: ${deviceCount}`);
            return true;
        }
    }
    catch (error) {
        console.error("Error detecting multiple connections:", error);
    }
    return false;
});
exports.default = detectMultipleConnection;
