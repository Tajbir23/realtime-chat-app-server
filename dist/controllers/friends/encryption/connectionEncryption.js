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
const connectionSchema_1 = __importDefault(require("../../../models/connectionSchema"));
const messageSchema_1 = __importDefault(require("../../../models/messageSchema"));
const findSocketIdbyId_1 = __importDefault(require("../../findSocketIdbyId"));
const __1 = require("../../..");
const connectionEncryption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, publicKey, isEncrypted, encryptPrivateKey, receiver } = req.body;
    if (!isEncrypted) {
        yield messageSchema_1.default.deleteMany({ chatId, isEncrypted: true });
    }
    const user = yield __1.connectedUsers;
    console.log(user);
    const receiverSocketId = yield (0, findSocketIdbyId_1.default)(receiver);
    console.log(receiverSocketId);
    console.log(receiver);
    if (receiverSocketId) {
        __1.io.to(receiverSocketId).emit('privateKey', { privateKey: encryptPrivateKey, _id: chatId, isEncrypted, publicKey });
    }
    else if (isEncrypted) {
        return res.send({
            warning: "Your friend is not online"
        });
    }
    const result = yield connectionSchema_1.default.findByIdAndUpdate(chatId, {
        publicKey,
        isEncrypted,
    }, { new: true }).populate("senderId", "-password")
        .populate("receiverId", "-password");
    if (result) {
        res.status(200).send({
            message: "Connection Encrypted Successfully",
            data: result
        });
    }
    else {
        res.status(400).send({
            message: "Connection Encrypted Failed",
            data: result
        });
    }
});
exports.default = connectionEncryption;
