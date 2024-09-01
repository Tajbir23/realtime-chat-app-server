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
const getFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, email } = req.user;
    const { currentPage = 1 } = req.query;
    try {
        const skip = (Number(currentPage - 1) * 10);
        const friends = yield connectionSchema_1.default
            .find({
            $or: [{ receiverId: _id }, { senderId: _id }],
        })
            .populate("senderId", "-password")
            .populate("receiverId", "-password")
            .skip(skip)
            .limit(10)
            .lean();
        const data = friends.map((friend) => {
            if (friend.senderId.email === email) {
                return friend.receiverId;
            }
            else {
                return friend.senderId;
            }
        });
        console.log("filter friends", friends);
        res.send(data);
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = getFriends;
