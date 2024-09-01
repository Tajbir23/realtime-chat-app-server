import { Request, Response } from "express";
import connectionModel from "../../models/connectionSchema";

const getFriends = async(req: Request, res: Response) => {
    const {_id} = (req as any).user
    console.log(_id)
    const friends = await connectionModel.find({
        $or: [
            {receiverId: _id},
            {senderId: _id}
        ]
    }).populate("senderId", "-password").populate("receiverId", "-password")
    
    res.send(friends);
}

export default getFriends;