import { Request, Response } from "express";
import messageModel from "../../models/messageSchema";
import findSocketIdById from "../findSocketIdbyId";
import { io } from "../..";

const deleteMessage = async(req: Request, res: Response) => {
    const { id } = req.params;
    const {type, messageId, opponentId } = req.body;
    const {_id} = (req as any).user;

    try {
        const message = await messageModel.findById(messageId)

        const opponentSocketId = await findSocketIdById(opponentId)

        if(type === 'deleteForMe'){
            if(message?.deletedFor === null){
                const result = await messageModel.findOneAndUpdate({_id: id}, {$set: {deletedFor: _id}}, {new: true})
                res.send(result)
            }else{
                const result = await messageModel.deleteOne({_id: messageId})
                res.send(result)
            }
        }

        if(type === 'unsent' && message?.senderId === _id){
            const result = await messageModel.findOneAndUpdate({_id: messageId}, {$set: {message: 'unsent'}}, {new: true})
            if(opponentSocketId && opponentId){
                io.to(opponentSocketId).emit("unsentMessage", result)
            }
            res.send(result)
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export default deleteMessage;