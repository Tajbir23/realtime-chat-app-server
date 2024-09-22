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
const getTotalLikeAndComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { _id } = req.user;
    const { myDayId, userId } = req.body;
    console.log(myDayId, userId);
    try {
        const [likeData] = yield likeSchema_1.default.aggregate([
            { $facet: {
                    myLike: [
                        { $match: { myDayId, reactorId: _id, posterId: userId } },
                        { $limit: 1 }
                    ],
                    totalLike: [
                        { $match: { myDayId, posterId: userId } },
                        { $count: "totalLike" }
                    ]
                } }
        ]);
        const myLike = likeData.myLike.length > 0 ? true : false;
        const totalLike = ((_a = likeData.totalLike[0]) === null || _a === void 0 ? void 0 : _a.totalLike) || 0;
        console.log(myLike, totalLike);
        res.status(200).send({ myLike, totalLike });
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = getTotalLikeAndComments;
