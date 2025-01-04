import { Request, Response } from "express";
import commentModel from "../../models/commentSchema";

const getComments = async(req: Request, res: Response) => {
    const {myDayId} = req.params
    try {
        const comments = await commentModel.find({myDayId}).sort({createdAt: 'desc'}).limit(5).populate('senderId')
        res.send(comments)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default getComments