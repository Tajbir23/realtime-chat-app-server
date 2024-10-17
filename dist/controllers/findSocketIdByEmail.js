"use strict";
// import { connectedUsers } from ".."
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../config/redis");
const findSocketIdByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const connectedUsers = yield redis_1.pubClient.hGetAll("connectedUsers");
    for (let [socketId, userData] of Object.entries(connectedUsers)) {
        const user = JSON.parse(userData);
        if (user.email === email) {
            return socketId;
        }
    }
    return null;
});
exports.default = findSocketIdByEmail;
