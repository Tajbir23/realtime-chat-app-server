import { Request, Response } from "express";
import connectionModel from "../../../models/connectionSchema";
import findSocketIdById from "../../findSocketIdbyId";
import { io } from "../../..";

const updateTheme = async(req: Request, res: Response) => {
    const {_id} = (req as any).user
    const {theme, themeType} = req.body
    const {chatId} = req.params

    console.log('chatId', chatId)
    try {
        const result = await connectionModel.findOneAndUpdate({_id: chatId}, {theme, themeUpdateBy: _id, themeType}, {new: true})
        const userId = result?.senderId === _id ? result?.receiverId : result?.senderId

        if(userId){
            const socketId = await findSocketIdById(userId)
            if(socketId){
                io?.to(socketId).emit("themeUpdate", result)
            }
        }
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
export default updateTheme;