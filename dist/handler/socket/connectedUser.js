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
exports.connectedUser = void 0;
const __1 = require("../..");
const findUser_1 = __importDefault(require("../../controllers/findUser"));
const getFriendsConnection_1 = __importDefault(require("../../controllers/friends/getFriendsConnection"));
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const addConnection_1 = __importDefault(require("./connection/addConnection"));
const connectedUser = (user, socket) => __awaiter(void 0, void 0, void 0, function* () {
    // user real public ip address
    const clientIp = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
    if ((user === null || user === void 0 ? void 0 : user._id) && user.uid) {
        yield (0, addConnection_1.default)(user === null || user === void 0 ? void 0 : user._id, socket.id, user.uid, clientIp);
    }
    const update = yield userSchema_1.default.updateOne({ email: user === null || user === void 0 ? void 0 : user.email }, { $set: { isActive: true, socketId: socket.id, ip: clientIp } });
    console.log("connectedUser user", user);
    const updatedUser = yield (0, findUser_1.default)(user === null || user === void 0 ? void 0 : user._id);
    yield (0, getFriendsConnection_1.default)(user === null || user === void 0 ? void 0 : user._id);
    __1.io.emit("users", updatedUser);
});
exports.connectedUser = connectedUser;
