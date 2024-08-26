import { Request, Response } from "express";
import userModel from "../models/userSchema";

const findOne = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        console.log(id)
        const user = await userModel.findById(id)
        res.send({email: user?.email, isActive: user?.isActive, name: user?.name, username: user?.username, photoUrl: user?.photoUrl, _id: user?._id})
    } catch (error) {
        
    }
}

export default findOne;