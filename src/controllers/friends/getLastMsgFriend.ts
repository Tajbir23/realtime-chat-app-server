import { io } from "../..";
import connectionModel from "../../models/connectionSchema"

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

    io.emit("recentMessage", recentMessage[0])
}

export default getLastMsgFriend;