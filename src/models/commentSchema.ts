import { model, Schema } from "mongoose";
import commentInterface from "../interface/commentInterface";

const commentSchema = new Schema<commentInterface>({
    posterId: {
        type: String,
        required: true,
        ref: "Users"
    },
    myDayId: {
        type: String,
        required: true,
        ref: "Day"
    },
    comment: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true,
        ref: "Users"
    }
}, {
    timestamps: true
})

const commentModel = model<commentInterface>('comments', commentSchema)

export default commentModel;