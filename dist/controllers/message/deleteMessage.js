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
const messageSchema_1 = __importDefault(require("../../models/messageSchema"));
const findSocketIdbyId_1 = __importDefault(require("../findSocketIdbyId"));
const __1 = require("../..");
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { type, messageId, opponentId } = req.body;
    const { _id } = req.user;
    try {
        const message = yield messageSchema_1.default.findById(messageId);
        const opponentSocketId = yield (0, findSocketIdbyId_1.default)(opponentId);
        if (type === 'deleteForMe') {
            if ((message === null || message === void 0 ? void 0 : message.deletedFor) === null) {
                const result = yield messageSchema_1.default.findOneAndUpdate({ _id: id }, { $set: { deletedFor: _id } }, { new: true });
                res.send(result);
            }
            else {
                const result = yield messageSchema_1.default.deleteOne({ _id: messageId });
                res.send(result);
            }
        }
        if (type === 'unsent' && (message === null || message === void 0 ? void 0 : message.senderId) === _id) {
            const result = yield messageSchema_1.default.findOneAndUpdate({ _id: messageId }, { $set: { message: 'unsent' } }, { new: true });
            if (opponentSocketId && opponentId) {
                __1.io.to(opponentSocketId).emit("unsentMessage", result);
            }
            res.send(result);
        }
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.default = deleteMessage;
