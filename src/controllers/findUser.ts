import { Request, Response } from "express";
import userModel from "../models/userSchema";
import mongoose from "mongoose";

const findOne = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        
        const isValidId = await  mongoose.Types.ObjectId.isValid(id)
        if(!isValidId){
            return res.status(404).json({message: 'User not found'})
        }
        
        const user = await userModel.findById(id).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error)
    }
}

export default findOne;