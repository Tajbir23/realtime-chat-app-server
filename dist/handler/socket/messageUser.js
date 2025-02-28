"use strict";
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
exports.messageUser = void 0;
const __1 = require("../..");
const findSocketIdbyId_1 = __importDefault(require("../../controllers/findSocketIdbyId"));
const messageUser = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const receiverId = message === null || message === void 0 ? void 0 : message.receiverId;
    // for (let [socketId, userData] of connectedUsers.entries()) {
    //   if (userData._id === receiverId) {
    //     io.to(socketId).emit("upcomingMessage", message);
    //   }
    // }
    const receiverSocketId = yield (0, findSocketIdbyId_1.default)(receiverId);
    console.log("receiverSocketId", receiverSocketId);
    receiverSocketId.forEach(socketId => {
        console.log("socketId", socketId);
        __1.io.to(socketId).emit("upcomingMessage", message);
    });
});
exports.messageUser = messageUser;
