import userModel from "../models/userSchema";
import mongoose from "mongoose";

const findOneUser = async(id: string) => {
    try {
        
        const isValidId = await  mongoose.Types.ObjectId.isValid(id)
        if(!isValidId){
            throw new Error
        }
        
        const user = await userModel.findById(id).select("-password")
        return user
    } catch (error) {
        console.log(error)
    }
}

export default findOneUser;