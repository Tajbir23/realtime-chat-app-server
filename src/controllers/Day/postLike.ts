import { Request, Response } from "express";
import likeModel from "../../models/likeSchema";
import { io } from "../..";
import findSocketIdById from "../findSocketIdbyId";
import notificationModel from "../../models/notificationSchema";

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

            // create notification
            const createNotification = await notificationModel.create({
                senderId: _id,
                receiverId: userId,
                type: "like",
                postId: myDayId
            })

            const unreadNotification = await notificationModel.countDocuments({receiverId: userId, isRead: false})
        
            const newNotification = await (await (await createNotification.populate('senderId', '-password')).populate('receiverId', '-password')).populate('postId')

            const socketId = await findSocketIdById(userId)
            console.log("socket id",socketId)
            if(socketId){
                const data: {message: string, myDayId: string, unreadNotification: number, newNotification: any} = {
                    message: "Someone like your post",
                    myDayId,
                    unreadNotification,
                    newNotification
                }
                console.log(data)
                socketId.forEach(id => {
                    io.to(id).emit("likeAndCommentNotification", data)
                })
            }
            res.status(201).send({totalLike ,message: "Like added"})
        }
    } catch (error) {
        res.send(error)
    }
}

export default postLike;