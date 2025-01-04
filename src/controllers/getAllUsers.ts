
import userModel from "../models/userSchema"

const getAllUsers = async(page: string,) => {
    const pageNumber = Number(page || 1)
    const limit = 20
    const skip = (pageNumber - 1) * limit 
    
    try {
        const users = await userModel.find().limit(limit).skip(skip).select("-password")
        
        return users
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}
export default getAllUsers