import {model, Schema } from "mongoose";
import messageInterface from "../interface/messageInterface";

const messageSchema= new Schema<messageInterface>({
    chatId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    senderUsername: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    senderPhotoUrl: {
        type: String,
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    receiverUsername: {
        type: String,
        required: true
    },
    receiverEmail: {
        type: String,
        required: true
    },
    receiverPhotoUrl: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const messageModel = model<messageInterface>('conversation', messageSchema)

export default messageModel;