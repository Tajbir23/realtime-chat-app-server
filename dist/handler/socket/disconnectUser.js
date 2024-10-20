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
const disconnectUser = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const user = __1.connectedUsers.get(socket.id);
    if (user) {
        const update = yield userSchema_1.default.updateOne({ email: user.email }, { isActive: false, lastActive: Number(Date.now()), socketId: null });
        const upDatedUser = yield (0, findUser_1.default)(user._id);
        console.log("disconnect", user._id);
        __1.io.emit("users", upDatedUser);
        yield (0, getFriendsConnection_1.default)(user._id);
        __1.connectedUsers.delete(socket.id);
        yield (0, deleteMyEncryptedMessage_1.default)(user._id);
        // console.log("Active users",connectedUsers)
    }
});
exports.disconnectUser = disconnectUser;
