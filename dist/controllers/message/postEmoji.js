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
const postEmoji = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId, emoji, receiverId } = req.body;
    const { _id } = req.user;
    try {
        const result = yield messageSchema_1.default.findOneAndUpdate({ _id: messageId }, { $set: { emoji: emoji } }, { new: true });
        // console.log(result)
        const receiver = yield (0, findSocketIdbyId_1.default)(receiverId);
        if (result && receiver) {
            __1.io.to(receiver).emit("emojiUpdate", result);
        }
        res.send(result);
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});
exports.default = postEmoji;
