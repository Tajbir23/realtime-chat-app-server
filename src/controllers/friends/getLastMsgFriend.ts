import { io } from "../..";
import user from "../../interface/userInterface";
import connectionModel from "../../models/connectionSchema"
import findSocketIdById from "../findSocketIdbyId";

const getLastMsgFriend = async (id: string) => {
    const recentMessage = await connectionModel.find({
        $or: [
            { senderId: id },
            { receiverId: id }
        ]
    })
    .sort({lastMessageAt: -1})
    .limit(1)
    .populate("senderId", "-password")
    .populate("receiverId", "-password")

    const receiverSocketId = findSocketIdById((recentMessage[0].receiverId as unknown as user)._id)
    const senderSocketId = findSocketIdById((recentMessage[0].senderId as unknown as user)._id)
    // io.to(receiverSocketId as string).emit("recentMessage", recentMessage)
    receiverSocketId.forEach(socketId => {
        io.to(socketId).emit("recentMessage", recentMessage)
    })
    // io.to(senderSocketId as string).emit("recentMessage", recentMessage)
    senderSocketId.forEach(socketId => {
        io.to(socketId).emit("recentMessage", recentMessage)
    })

}

export default getLastMsgFriend;