import { model, Schema } from "mongoose";
import MyDayInterFace from "../interface/myDayInterFace";

const myDaySchema = new Schema<MyDayInterFace>({
    userId: {
        type: String,
        required: true,
        ref: "Users",
    },
    myDay: {
        type: String,
        required: true
    },
    myDayEndAt: {
        type: Number,
        required: true
    },
})

const myDayModel = model<MyDayInterFace>("Day", myDaySchema)

export default myDayModel;