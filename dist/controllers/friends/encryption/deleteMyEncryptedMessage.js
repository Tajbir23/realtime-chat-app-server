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
const connectionSchema_1 = __importDefault(require("../../../models/connectionSchema"));
const messageSchema_1 = __importDefault(require("../../../models/messageSchema"));
const deleteMyEncryptedMessage = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step 1: Update `connectionModel` to set `isEncrypted` to false for the user's connections
        yield connectionSchema_1.default.updateMany({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ],
            isEncrypted: true
        }, {
            $set: { isEncrypted: false }
        });
        // Step 2: Permanently delete messages where `deletedFor` contains an opponent's ID
        yield messageSchema_1.default.deleteMany({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ],
            isEncrypted: true,
            deletedFor: { $ne: userId } // Only delete if user's ID is not in `deletedFor`
        });
        // Step 3: If the message is not deleted for anyone, set `deletedFor` to the user's ID
        yield messageSchema_1.default.updateMany({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ],
            isEncrypted: true,
            deletedFor: { $exists: false } // Ensure `deletedFor` field is empty
        }, {
            $set: { deletedFor: userId }
        });
        console.log("Messages processed successfully.");
    }
    catch (error) {
        console.error("Error processing messages:", error);
        throw new Error("Could not process messages.");
    }
});
exports.default = deleteMyEncryptedMessage;
