import { Request, Response } from "express"
import connectionModel from "../../models/connectionSchema"
import messageModel from "../../models/messageSchema"

const deleteChat = async (req: Request, res: Response) => {
    const {_id} = (req as any).user
    const {chatId} = req.body
    try {
        const isDeleted = await connectionModel.findById(chatId)
        if(isDeleted?.delete && isDeleted.deleteFor !== _id){
            const result = await connectionModel.findByIdAndDelete(chatId)
            await messageModel.deleteMany({chatId})
            res.send(result)
        }else{
            const result = await connectionModel.findOneAndUpdate({_id: chatId}, {deleteFor: _id, delete: true}, {new: true})
            res.send(result)
        }
    } catch (error) {
        res.send(error)
    }
}

export default deleteChat;