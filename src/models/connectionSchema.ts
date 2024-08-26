import { model, Schema } from "mongoose";
import userConnections from "../interface/connectionInterface";

const connectionSchema = new Schema<userConnections>({
    senderName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },
    senderUserName: {
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
    receiverEmail: {
        type: String,
        required: true
    },
    receiverUserName: {
        type: String,
        required: true
    },
    receiverPhotoUrl: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const connectionModel = model<userConnections>('connections', connectionSchema)

export default connectionModel