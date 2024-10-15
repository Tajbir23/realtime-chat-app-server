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

    const receiverId = (recentMessage[0].receiverId as unknown as user)._id.toString()
    const senderId = (recentMessage[0].senderId as unknown as user)._id.toString()
    const receiverSocketId = await findSocketIdById(receiverId)
    const senderSocketId = await findSocketIdById(senderId)
    if (receiverSocketId) io?.to(receiverSocketId).emit("recentMessage", recentMessage)
    if (senderSocketId) io?.to(senderSocketId).emit("recentMessage", recentMessage)
}

export default getLastMsgFriend;