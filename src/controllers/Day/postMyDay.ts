import { Request, Response } from "express";
import userModel from "../../models/userSchema";
import myDayModel from "../../models/myDaySchema";
import { io } from "../..";
import getFriendsConnectionById from "../friends/getFriendsConnection";

const postMyDay = async (req: Request, res: Response) => {
    const {_id} = (req as any).user
    const {content} = req.body
    const myDayEndAt = Number(Date.now()) + 86400000
    // console.log("myDayEndAt", myDayEndAt)
    // console.log("My day",content)
    try {
        const myDayData = await myDayModel.create({userId: _id, myDay: content, myDayEndAt})
        console.log("myDayData", myDayData)

        const user = await userModel.findByIdAndUpdate({_id}, {myDay: content, myDayEndAt, isActiveMyDay: true, myDayId: myDayData._id}).select("-password")

        await getFriendsConnectionById(_id)
        io.emit("users", user)
        res.status(201).send({message: "My Day added successfully"})
    } catch (error) {
        console.log(error)
        res.send((error as Error).message)
    }
}

export default postMyDay;