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
const likeSchema_1 = __importDefault(require("../../models/likeSchema"));
const __1 = require("../..");
const findSocketIdbyId_1 = __importDefault(require("../findSocketIdbyId"));
const notificationSchema_1 = __importDefault(require("../../models/notificationSchema"));
const postLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, myDayId, like } = req.body;
    const { _id } = req.user;
    try {
        const likeAction = yield likeSchema_1.default.findOneAndDelete({
            posterId: userId,
            reactorId: _id,
            myDayId: myDayId
        });
        if (likeAction) {
            const totalLike = yield likeSchema_1.default.countDocuments({ myDayId });
            res.status(200).send({ totalLike, message: "Like removed" });
        }
        else {
            yield likeSchema_1.default.create({
                posterId: userId,
                reactorId: _id,
                myDayId: myDayId,
                like: like
            });
            const totalLike = yield likeSchema_1.default.countDocuments({ myDayId });
            // create notification
            const createNotification = yield notificationSchema_1.default.create({
                senderId: _id,
                receiverId: userId,
                type: "like",
                postId: myDayId
            });
            const unreadNotification = yield notificationSchema_1.default.countDocuments({ receiverId: userId, isRead: false });
            const newNotification = yield (yield (yield createNotification.populate('senderId', '-password')).populate('receiverId', '-password')).populate('postId');
            const socketId = yield (0, findSocketIdbyId_1.default)(userId);
            if (socketId) {
                const data = {
                    message: "Someone like your post",
                    myDayId,
                    unreadNotification,
                    newNotification
                };
                console.log(data);
                __1.io.to(socketId).emit("likeAndCommentNotification", data);
            }
            res.status(201).send({ totalLike, message: "Like added" });
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = postLike;
