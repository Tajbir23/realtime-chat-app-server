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
const commentSchema_1 = __importDefault(require("../../models/commentSchema"));
const __1 = require("../..");
const findSocketIdbyId_1 = __importDefault(require("../findSocketIdbyId"));
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, myDayId, comment } = req.body;
    const { _id } = req.user;
    try {
        yield commentSchema_1.default.create({ posterId: userId, senderId: _id, myDayId, comment });
        if (userId !== _id) {
            const socketId = (0, findSocketIdbyId_1.default)(userId);
            if (socketId) {
                __1.io.to(socketId).emit('likeAndCommentNotification', {
                    message: "Someone comment your day"
                });
            }
        }
        res.status(200).send({ message: "Comment posted" });
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = postComment;
