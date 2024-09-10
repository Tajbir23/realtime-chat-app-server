import { io } from "../..";
import user from "../../interface/userInterface";
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
        console.log(message)
        return message
    }

    const messageObject = recentMessage[0].toObject()
    // console.log(messageObject)
    const sender = messageObject.senderId as unknown as user;
    const receiver = messageObject.receiverId as unknown as user;

    const senderId: string = sender._id.toString()
    const receiverId: string = receiver._id.toString()

    if(id === senderId){
        const updatedObject = deleteObject("receiverId", messageObject)
        console.log(updatedObject)
        io.emit("recentMessage", updatedObject)
    }else if(id === receiverId){
        const updatedObject = deleteObject("senderId", messageObject)
        console.log(updatedObject)
        io.emit("recentMessage", updatedObject)
    }

}

export default getLastMsgFriend;