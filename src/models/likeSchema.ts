import { model, Schema } from "mongoose";
import LikeInterface from "../interface/likeInterface";

const likeSchema = new Schema<LikeInterface>({
    posterId: {
        type: String,
        required: true
    },
    reactorId: {
        type: String,
        required: true
    },
    myDayId: {
        type: String,
        required: true
    },
    like: {
        type: Boolean,
    }
},{
    timestamps: true
})

const likeModel = model<LikeInterface>('reactions', likeSchema)
export default likeModel