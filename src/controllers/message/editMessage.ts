import { Request, Response } from "express";
import messageModel from "../../models/messageSchema";
import findSocketIdById from "../findSocketIdbyId";
import { io } from "../..";

const editMessage = async(req: Request, res: Response) => {
    const {messageId} = req.params
    const {message} = req.body
    const {_id} = (req as any).user

    try {
        const result = await messageModel.findOneAndUpdate({_id: messageId, senderId: _id}, {message, edited: true}, {new: true})
        if(result?.receiverId){
            const opponentSocketId = await findSocketIdById(result?.receiverId)
            if(opponentSocketId){
                io.to(opponentSocketId).emit("updateMessage", result)
            }
        }
        res.send(result)
    } catch (error: any) {
        res.status(500).send({ error: error.message })
    }
}

export default editMessage;