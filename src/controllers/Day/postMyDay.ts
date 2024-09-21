import { Request, Response } from "express";
import userModel from "../../models/userSchema";
import myDayModel from "../../models/myDaySchema";
import { io } from "../..";

const postMyDay = async (req: Request, res: Response) => {
    const {_id} = (req as any).user
    const {content} = req.body
    const myDayEndAt = Number(Date.now()) + 86400000
    console.log(content)
    try {
        await userModel.findByIdAndUpdate({_id}, {myDay: content, myDayEndAt, isActiveMyDay: true})
        await myDayModel.create({userId: _id, myDay: content, myDayEndAt})
        io.emit("myDay", {myDay: content, myDayEndAt, _id})
        
        res.status(201).send({message: "My Day added successfully"})
    } catch (error) {
        res.send((error as Error).message)
    }
}

export default postMyDay;