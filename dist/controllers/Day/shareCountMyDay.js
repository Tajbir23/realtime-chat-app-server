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
const myDaySchema_1 = __importDefault(require("../../models/myDaySchema"));
const shareCountMyDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share, myDayId } = req.body;
    try {
        if (share) {
            const myDay = yield myDaySchema_1.default.findOneAndUpdate({ _id: myDayId }, { $inc: { share: 1 } });
            if (myDay) {
                res.status(200).send({ message: "Share count updated successfully" });
            }
            else {
                res.status(404).send({ message: "My Day not found" });
            }
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = shareCountMyDay;
