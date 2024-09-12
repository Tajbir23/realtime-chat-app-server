import { io } from "../..";
import user from "../../interface/userInterface";
import connectionModel from "../../models/connectionSchema"
import findSocketIdByEmail from "../findSocketIdByEmail";

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

    const receiverSocketId = findSocketIdByEmail((recentMessage[0].receiverId as unknown as user).email)
    const senderSocketId = findSocketIdByEmail((recentMessage[0].senderId as unknown as user).email)
    io.to(receiverSocketId as string).emit("recentMessage", recentMessage)
    io.to(senderSocketId as string).emit("recentMessage", recentMessage)

}

export default getLastMsgFriend;