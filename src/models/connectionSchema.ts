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
},{
    timestamps: true
})

const connectionModel = model<userConnections>('connections', connectionSchema)

export default connectionModel