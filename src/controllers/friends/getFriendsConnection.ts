import connectionModel from "../../models/connectionSchema";
import userModel from "../../models/userSchema";
import findSocketIdByEmail from "../findSocketIdByEmail";
import { io } from "../..";
import friendsInterface from "../../interface/friendsInterface";

const getFriendsConnectionById = async (_id: string) => {
    
  try {
    // Fetch the current user (your details)
    // const me = await userModel.findOne({ email });
    // if (!me) {
    //     throw new Error('User not found');
    // }

    const friends: friendsInterface[] = await connectionModel
      .find({
        $or: [
          { senderId: _id }, // If you're the sender
          { receiverId: _id }, // If you're the receiver
        ],
      })
      .populate("senderId", "-password")
      .populate("receiverId", "-password")
      .lean();

    friends.forEach((friend) => {

      if (friend.senderId._id.toString() === _id) {
        const receiverEmail = friend.receiverId.email;
        
        delete (friend as any).receiverId;

        const socketId = findSocketIdByEmail(receiverEmail);
        if (socketId) {
          io.to(socketId).emit("updateFriendStatus", friend);
        }
      } else if (friend.receiverId._id.toString() === _id) {
        const senderEmail = friend.senderId.email;
       
        delete (friend as any).senderId;

        const socketId = findSocketIdByEmail(senderEmail);
        if (socketId) {
          io.to(socketId).emit("updateFriendStatus", friend);
        }
      }
    });
  } catch (error) {
    console.error("Error in getFriendsConnectionById:", error);
  }
};

export default getFriendsConnectionById;
