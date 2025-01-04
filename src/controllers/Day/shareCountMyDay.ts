import { Request, Response } from "express";
import myDayModel from "../../models/myDaySchema";

const shareCountMyDay = async(req: Request, res: Response) => {
    const {share, myDayId} = req.body
    try {
        if(share){
            const myDay = await myDayModel.findOneAndUpdate({_id: myDayId}, {$inc: {share: 1}})
            if(myDay){
                res.status(200).send({message: "Share count updated successfully"})
            }else{
                res.status(404).send({message: "My Day not found"})
            }
        }
    } catch (error) {
        res.send(error)
    }
}

export default shareCountMyDay;