import connectionModel from "../../models/connectionSchema";
// import userModel from "../../models/userSchema";
import { io } from "../..";
import friendsInterface from "../../interface/friendsInterface";
import findSocketIdById from "../findSocketIdbyId";

const getFriendsConnectionById = async (_id: string) => {
    
  try {

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

    friends.forEach(async (friend) => {

      if (friend.senderId._id.toString() === _id) {
        // const receiverEmail = friend.receiverId.email;
        const receiverId = friend.receiverId._id.toString()
        
        delete (friend as any).receiverId;

        // const socketId = findSocketIdByEmail(receiverEmail);
        const socketId = await findSocketIdById(receiverId);
        if (socketId) {
          socketId.forEach((id: string) => {
            io.to(id).emit("updateFriendStatus", friend);
          })
        }
      } else if (friend.receiverId._id.toString() === _id) {
        // const senderEmail = friend.senderId.email;
        const senderId = friend.senderId._id.toString();
       
        delete (friend as any).senderId;

        // const socketId = findSocketIdByEmail(senderEmail);
        const socketId = await findSocketIdById(senderId);
        if (socketId) {
          socketId.forEach((id: string) => {
            io.to(id).emit("updateFriendStatus", friend);
            
          })
        }
      }
    });
  } catch (error) {
    console.error("Error in getFriendsConnectionById:", error);
  }
};

export default getFriendsConnectionById;
