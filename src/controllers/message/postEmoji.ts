import { Request, Response } from "express";
import messageModel from "../../models/messageSchema";
import findSocketIdById from "../findSocketIdbyId";
import { io } from "../..";

const postEmoji = async (req: Request, res: Response) => {
    const {messageId, emoji, receiverId} = req.body;
    const {_id} = (req as any).user
    
    try {
        const result = await messageModel.findOneAndUpdate({_id: messageId}, {$set: {emoji: emoji}}, {new: true})
        // console.log(result)
        const receiver = await findSocketIdById(receiverId)

        if(result && receiver){
            receiver.forEach(socketId => {
                io.to(socketId).emit("emojiUpdate", result)
            })
            
        }

        res.send(result)
    } catch (error) {
        console.error(error)
        res.send(error)
    }

}

export default postEmoji;