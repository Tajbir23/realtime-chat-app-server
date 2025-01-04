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
const getFriendsConnection_1 = __importDefault(require("./getFriendsConnection"));
const blockFriend = (_id, chatId, blockUserId, isBlock) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectionSchema_1.default.updateOne({ _id: chatId }, { $set: { blockUserId, isBlock, blockSender: _id } });
        const updated = yield connectionSchema_1.default.findOne({ _id: chatId });
        console.log("updated connection", updated);
        yield (0, getFriendsConnection_1.default)(blockUserId);
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = blockFriend;
