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
const notificationSchema_1 = __importDefault(require("../../../models/notificationSchema"));
const getNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { page, limit } = req.query;
    // console.log(userId);
    const startIndex = page * Number(limit);
    // const endIndex = startIndex + Number(limit) as unknown as number;
    const notification = yield notificationSchema_1.default.find({ receiverId: _id }).sort({ time: -1 }).skip(startIndex).limit(limit).populate("senderId", "-password").populate('receiverId', '-password').populate('postId');
    notification.forEach((item) => {
        item.isRead = true;
        item.save();
    });
    // console.log(notification);
    res.send(notification);
});
exports.default = getNotification;
