import { Request, Response } from "express";
import myDayModel from "../../models/myDaySchema";

const shareMyDay = async(req: Request, res: Response) => {
    const {id} = req.params
    
    try {
        const data = await myDayModel.findById(id).populate('userId', '-password')
        if(!data) return res.status(404).json({message: 'My Day not found'})
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export default shareMyDay