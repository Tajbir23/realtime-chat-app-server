"use strict";
// import { connectedUsers } from "..";
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
const redis_1 = __importDefault(require("../config/redis"));
// const findSocketIdById = (id: string): string[] => {
//     // Check if the user exists in connectedUsers
//     if (connectedUsers[id]) {
//         // Get all the socket IDs (values) associated with the user's devices (deviceId keys)
//         return Object.values(connectedUsers[id]); // Returns array of socket IDs
//     }
//     return []; // Return an empty array if no sockets found
// };
// export default findSocketIdById;
const findSocketIdById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sockets = yield redis_1.default.hvals(`user:${id}`);
        return sockets.map(socket => JSON.parse(socket).socketId);
    }
    catch (error) {
        console.log(error.message);
        return [];
    }
});
exports.default = findSocketIdById;
