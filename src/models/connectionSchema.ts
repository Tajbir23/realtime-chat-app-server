import { model, Schema } from "mongoose";
import userConnections from "../interface/connectionInterface";

const connectionSchema = new Schema<userConnections>({
    
    senderId: {
        type: String,
        required: true,
        ref: "Users"
    },
    receiverId: {
        type: String,
        required: true,
        ref: "Users"
    },
    lastMessage: {
        type: String,
    },
    lastMessageAt: {
        type: Number
    },
    blockUserId: {
        type: String
    },
    isBlock: {
        type: Boolean,
        default: false,
        required: true
    },
    blockSender: {
        type: String
    },
    theme: {
        type: String,
    },
    themeUpdateBy: {
        type: String
    }
},{
    timestamps: true
})

const connectionModel = model<userConnections>('connections', connectionSchema)

export default connectionModel