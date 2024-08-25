import userModel from "../models/userSchema"

const getAllUsers = async() => {
    try {
        const users = await userModel.find()
        return users.map((user) => ({ name: user.name, username: user.username, email: user.email, photoUrl: user.photoUrl, isActive: user.isActive }));
    } catch (error:any) {
        throw new Error(error.message)
    }
}
export default getAllUsers