import { model, Schema } from "mongoose";
import notificationInterface from "../interface/notificationInterface";

const notificationSchema = new Schema<notificationInterface>({
    senderId: {
        type: String,
        ref: 'Users',
        required: true
    },
    receiverId: {
        type: String,
        ref: 'Users',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    postId: {
        type: String,
        required: true,
        ref: 'Day'
    }
}, { timestamps: true });

const notificationModel = model<notificationInterface>('notifications', notificationSchema);

export default notificationModel;