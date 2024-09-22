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
            res.status(201).send({ totalLike, message: "Like added" });
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = postLike;
