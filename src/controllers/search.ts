import userModel from "../models/userSchema"

const searchUsers = async(search: string, email: string) => {
    try {
        const result = await userModel.find({
            $and: [
                { email: { $ne: email } },
                {
                    $or: [
                        { name: { $regex: `^${search}`, $options: 'i' } },
                        { username: { $regex: `^${search}`, $options: 'i' } },
                        { email: { $regex: `^${search}`, $options: 'i' } }
                    ]
                }
            ]
        }).select('-password').limit(10).sort({isActive: -1, lastActive: -1})
        
        if(result.length > 0){
            return result
        }
    } catch (error) {
        console.log((error as any).message)
    }
}

export default searchUsers