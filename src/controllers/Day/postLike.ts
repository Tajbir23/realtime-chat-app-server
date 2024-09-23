import { Request, Response } from "express";
import likeModel from "../../models/likeSchema";
import { io } from "../..";
import findSocketIdById from "../findSocketIdbyId";

const postLike = async(req: Request, res: Response) => {
    const {userId, myDayId, like} = req.body;
    const {_id} = (req as any).user
    try {
        const likeAction = await likeModel.findOneAndDelete({
            posterId: userId,
            reactorId: _id,
            myDayId: myDayId
        })

        if(likeAction){
            const totalLike = await likeModel.countDocuments({myDayId})
            res.status(200).send({totalLike,message: "Like removed"})
        }else{
            await likeModel.create({
                posterId: userId,
                reactorId: _id,
                myDayId: myDayId,
                like: like
            })
            const totalLike = await likeModel.countDocuments({myDayId})

            const socketId = findSocketIdById(userId)
            if(socketId){
                const data: {message: string, myDayId: string} = {
                    message: "Someone like your post",
                    myDayId
                }
                io.to(socketId).emit("likeAndCommentNotification", data)
            }
            res.status(201).send({totalLike ,message: "Like added"})
        }
    } catch (error) {
        res.send(error)
    }
}
export default postLike;