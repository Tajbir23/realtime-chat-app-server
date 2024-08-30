
import userModel from "../models/userSchema"

const getAllUsers = async(email: string) => {
    // console.log('get All users',email)
    try {
        const users = await userModel.find({email: {$ne: email}})
        return users.map((user) => ({ name: user.name, username: user.username, email: user.email, photoUrl: user.photoUrl, isActive: user.isActive, _id: user._id }));
    } catch (error:any) {
        throw new Error(error.message)
    }
}
export default getAllUsers