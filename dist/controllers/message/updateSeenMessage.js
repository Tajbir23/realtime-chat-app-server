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
const connectionSchema_1 = __importDefault(require("../../models/connectionSchema"));
const messageSchema_1 = __importDefault(require("../../models/messageSchema"));
const findSocketIdbyId_1 = __importDefault(require("../findSocketIdbyId"));
const __1 = require("../..");
const updateSeenMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { receiverId, lastMessageId, chatId } = req.body;
    try {
        yield connectionSchema_1.default.updateOne({
            _id: chatId
        }, {
            $set: {
                lastMessageSeen: true,
                lastMessageSeenUserId: _id
            }
        }, {
            new: true
        });
        yield messageSchema_1.default.updateOne({
            _id: lastMessageId
        }, {
            $set: {
                seen: true
            }
        }, {
            new: true
        });
        const socketIds = yield (0, findSocketIdbyId_1.default)(receiverId);
        socketIds.forEach(socketId => {
            __1.io.to(socketId).emit('seenMessage', lastMessageId);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = updateSeenMessage;
