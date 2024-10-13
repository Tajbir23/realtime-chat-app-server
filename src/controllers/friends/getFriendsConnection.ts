import connectionModel from "../../models/connectionSchema";
import { io } from "../..";
import friendsInterface from "../../interface/friendsInterface";
import findSocketIdById from "../findSocketIdbyId";

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

    friends.forEach(async (friend) => {
      if (friend.senderId._id.toString() === _id) {
        // const receiverEmail = friend.receiverId.email;
        const receiverId = friend.receiverId._id
        delete (friend as any).receiverId;

        const socketId = await findSocketIdById(receiverId);
        if (socketId) {
          io?.to(socketId).emit("updateFriendStatus", friend);
        }
      } else if (friend.receiverId._id.toString() === _id) {
        // const senderEmail = friend.senderId.email;
        const senderId = friend.senderId._id
        delete (friend as any).senderId;

        const socketId = await findSocketIdById(senderId);
        if (socketId) {
          io?.to(socketId).emit("updateFriendStatus", friend);
        }
      }
    });  } catch (error) {
    console.error("Error in getFriendsConnectionById:", error);
  }
};

export default getFriendsConnectionById;
