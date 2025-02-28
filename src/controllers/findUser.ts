import userModel from "../models/userSchema";
import mongoose from "mongoose";

const findOneUser = async(id: string) => {
    console.log("findOneUser id", id)
    try {
        
        const isValidId = await  mongoose.Types.ObjectId.isValid(id)
        console.log("findOneUser isValid", isValidId)
        if(!isValidId){
            throw new Error
        }
        
        const user = await userModel.findById(id).select("-password")
        return user
    } catch (error: any) {
        console.log("findOneUser error", error.message)
        console.log(error)
    }
}

export default findOneUser;