import connectionModel from "../../models/connectionSchema";
import userModel from "../../models/userSchema";
import findSocketIdByEmail from "../findSocketIdByEmail";
import { io } from "../..";
import friendsInterface from "../../interface/friendsInterface";

const getFriendsConnectionByEmail = async (email: string) => {
    try {
        // Fetch the current user (your details)
        const me = await userModel.findOne({ email });
        if (!me) {
            throw new Error('User not found');
        }

        
        const friends: friendsInterface[] = await connectionModel.find({
            $or: [
                { senderId: me._id },   // If you're the sender
                { receiverId: me._id }  // If you're the receiver
            ]
        }).populate("senderId").populate("receiverId").lean();

        

        friends.forEach((friend) => {
            if(friend.senderId.email === email){
                const receiverEmail = friend.receiverId.email
                
                delete (friend as any).receiverId
                
                const socketId = findSocketIdByEmail(receiverEmail);
                if (socketId) {
                    io.to(socketId).emit("updateFriendStatus", friend);
                }
            }else if(friend.receiverId.email === email){
                const senderEmail = friend.senderId.email
                delete (friend as any).senderId
                
                const socketId = findSocketIdByEmail(senderEmail);
                if (socketId) {
                    io.to(socketId).emit("updateFriendStatus", friend);
                }
            }
        })


    } catch (error) {
        console.error('Error in getFriendsConnectionByEmail:', error);
    }
};

export default getFriendsConnectionByEmail;
