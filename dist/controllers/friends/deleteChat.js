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
const deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { chatId } = req.body;
    try {
        const isDeleted = yield connectionSchema_1.default.findById(chatId);
        if ((isDeleted === null || isDeleted === void 0 ? void 0 : isDeleted.delete) && isDeleted.deleteFor !== _id) {
            const result = yield connectionSchema_1.default.findByIdAndDelete(chatId);
            yield messageSchema_1.default.deleteMany({ chatId });
            res.send(result);
        }
        else {
            const result = yield connectionSchema_1.default.findOneAndUpdate({ _id: chatId }, { deleteFor: _id, delete: true }, { new: true });
            res.send(result);
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = deleteChat;
