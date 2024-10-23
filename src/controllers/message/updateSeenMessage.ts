import { Request, Response } from "express";
import connectionModel from "../../models/connectionSchema";
import messageModel from "../../models/messageSchema";
import findSocketIdById from "../findSocketIdbyId";
import { io } from "../..";

const updateSeenMessage = async(req: Request, res: Response) => {
    const {_id} = (req as any).user
    const {receiverId, lastMessageId, chatId} = req.body
    try {
        await connectionModel.updateOne({
            _id :chatId
        }, {
            $set: {
                lastMessageSeen: true,
                lastMessageSeenUserId: _id
            }
        }, {
            new: true
        })

        await messageModel.updateOne({
            _id: lastMessageId
        }, {
            $set: {
                seen: true
            }
        }, {
            new: true
        })

        const socketIds = await findSocketIdById(receiverId)
        socketIds.forEach(socketId => {
            io.to(socketId).emit('seenMessage', lastMessageId)
        })
    } catch (error) {
        console.log(error)
    }
}

export default updateSeenMessage;