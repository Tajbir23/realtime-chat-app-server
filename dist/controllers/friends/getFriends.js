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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectionSchema_1 = __importDefault(require("../../models/connectionSchema"));
const getFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, email } = req.user;
    const { currentPage = 1 } = req.query;
    try {
        const skip = (Number(currentPage - 1) * 10);
        const friends = yield connectionSchema_1.default
            .find({
            $or: [{ receiverId: _id }, { senderId: _id }], deleteFor: { $ne: _id }
        })
            .populate("senderId", "-password")
            .populate("receiverId", "-password")
            .sort({ lastMessageAt: -1 })
            .skip(skip)
            .limit(10)
            .lean();
        const data = friends.map((friend) => {
            const { senderId, receiverId } = friend, rest = __rest(friend, ["senderId", "receiverId"]);
            const removeSender = senderId && senderId.email === email;
            const removeReceiver = receiverId && receiverId.email === email;
            return Object.assign(Object.assign(Object.assign({}, rest), (removeSender ? {} : { senderId })), (removeReceiver ? {} : { receiverId }));
        });
        res.send(data);
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = getFriends;
