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

    const deleteObject = (key: string, message: any) => {
        delete message[key]
        return message
    }

    const messageObject = recentMessage[0].toObject()
    if(id === messageObject.senderId){
        const updatedObject = deleteObject("receiverId", messageObject)
        io.emit("recentMessage", updatedObject)
        io.emit("recentMessage", updatedObject)
    }else{
        const updatedObject = deleteObject("senderId", messageObject)
        io.emit("recentMessage", updatedObject)
        io.emit("recentMessage", updatedObject)
    }

}

export default getLastMsgFriend;