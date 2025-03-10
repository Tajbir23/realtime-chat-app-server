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
exports.disconnectUser = void 0;
const __1 = require("../..");
const findUser_1 = __importDefault(require("../../controllers/findUser"));
const deleteMyEncryptedMessage_1 = __importDefault(require("../../controllers/friends/encryption/deleteMyEncryptedMessage"));
const getFriendsConnection_1 = __importDefault(require("../../controllers/friends/getFriendsConnection"));
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const findUserIdBySocketId_1 = __importDefault(require("./connection/findUserIdBySocketId"));
const removeConnection_1 = __importDefault(require("./connection/removeConnection"));
const disconnectUser = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("disconnectUser socket id", socket.id);
    const userId = yield (0, findUserIdBySocketId_1.default)(socket.id);
    console.log("disconnect user", userId);
    if (userId) {
        const removeActiveSocketId = yield (0, removeConnection_1.default)(socket.id);
        console.log("disconnectUser removeActive", removeActiveSocketId);
        if (removeActiveSocketId) {
            const update = yield userSchema_1.default.findByIdAndUpdate({ _id: userId }, { isActive: false, lastActive: Number(Date.now()), socketId: null });
            const upDatedUser = yield (0, findUser_1.default)(userId);
            console.log("disconnect", userId);
            __1.io.emit("users", upDatedUser);
            yield (0, getFriendsConnection_1.default)(userId);
            yield (0, deleteMyEncryptedMessage_1.default)(userId);
        }
        // console.log("Active users",connectedUsers)
    }
});
exports.disconnectUser = disconnectUser;
