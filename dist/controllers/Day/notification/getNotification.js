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
    try {
        const { _id } = req.user;
        const page = Number(req.query.page) || 0; // Default page to 0 if not provided
        const limit = Number(req.query.limit) || 12; // Default limit to 10 if not provided
        const startIndex = page * limit;
        const notifications = yield notificationSchema_1.default
            .find({ receiverId: _id })
            .sort({ time: -1 }) // Recent to last by time
            .skip(startIndex)
            .limit(limit)
            .populate("senderId", "-password")
            .populate("receiverId", "-password")
            .populate("postId");
        yield Promise.all(notifications.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            item.isRead = true;
            yield item.save();
        })));
        res.status(200).send(notifications);
    }
    catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).send({ error: "Failed to fetch notifications." });
    }
});
exports.default = getNotification;
