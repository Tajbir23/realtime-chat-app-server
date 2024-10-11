import { Request, Response } from "express";
import connectionModel from "../../../models/connectionSchema";

const updateTheme = async(req: Request, res: Response) => {
    const {_id} = (req as any).user
    const {theme} = req.body
    const {chatId} = req.params

    console.log('chatId', chatId)
    try {
        const result = await connectionModel.findOneAndUpdate({_id: chatId}, {theme, themeUpdateBy: _id}, {new: true})
        console.log(result)
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}
export default updateTheme;