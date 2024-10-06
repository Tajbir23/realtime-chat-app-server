import { Request, Response } from "express";
import commentModel from "../../models/commentSchema";
import { io } from "../..";
import findSocketIdById from "../findSocketIdbyId";
import notificationModel from "../../models/notificationSchema";

const postComment = async (req: Request, res: Response) => {
    const {userId, myDayId, comment} = req.body;
    const {_id} = (req as any).user
    try {
        await commentModel.create({posterId: userId, senderId: _id, myDayId, comment})

        if(userId !== _id){
            await notificationModel.create({
                senderId: _id,
                receiverId: userId,
                type: "comment",
                postId: myDayId
            })

            const unreadNotification = await notificationModel.countDocuments({receiverId: userId, isRead: false})

            const socketId = findSocketIdById(userId)
        if(socketId){
            io.to(socketId).emit('likeAndCommentNotification', {
                message: "Someone comment your day",
                unreadNotification
            })
        }
        }
        res.status(200).send({message: "Comment posted"})
    } catch (error) {
        res.send(error)
    }
}

export default postComment;