import {model, Schema } from "mongoose";
import messageInterface from "../interface/messageInterface";

const messageSchema= new Schema<messageInterface>({
    chatId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        // required: true,
        // ref: "Users"
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
    receiverId: {
        type: String,
        // required: true,
        // ref: "Users"
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
    deletedFor: {
        type: String,
        default: null
    },
    emoji: {
        type: String
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})

const messageModel = model<messageInterface>('conversation', messageSchema)

export default messageModel;