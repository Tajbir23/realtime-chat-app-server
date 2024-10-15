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
const findSocketIdbyId_1 = __importDefault(require("../../findSocketIdbyId"));
const __1 = require("../../..");
const updateTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { theme, themeType } = req.body;
    const { chatId } = req.params;
    console.log('chatId', chatId);
    try {
        const result = yield connectionSchema_1.default.findOneAndUpdate({ _id: chatId }, { theme, themeUpdateBy: _id, themeType }, { new: true });
        const userId = (result === null || result === void 0 ? void 0 : result.senderId) === _id ? result === null || result === void 0 ? void 0 : result.receiverId : result === null || result === void 0 ? void 0 : result.senderId;
        if (userId) {
            const socketId = yield (0, findSocketIdbyId_1.default)(userId);
            if (socketId) {
                __1.io.to(socketId).emit("themeUpdate", result);
            }
        }
        res.send(result);
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = updateTheme;
