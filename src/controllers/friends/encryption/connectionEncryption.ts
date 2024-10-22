import { Request, Response } from "express";
import connectionModel from "../../../models/connectionSchema";
import messageModel from "../../../models/messageSchema";
import findSocketIdById from "../../findSocketIdbyId";
import { connectedUsers, io } from "../../..";

const connectionEncryption = async(req: Request, res: Response) => {
    const {chatId, publicKey, isEncrypted, encryptPrivateKey, receiver} = req.body;
    
    if(!isEncrypted){
        await messageModel.deleteMany({chatId, isEncrypted: true})
    }

    const user = await connectedUsers
    console.log(user)
    const receiverSocketId = await findSocketIdById(receiver)
    console.log(receiverSocketId)
    console.log(receiver)
    if(receiverSocketId){
        receiverSocketId.forEach(socketId => {
            io.to(socketId).emit('privateKey', {privateKey: encryptPrivateKey, _id: chatId, isEncrypted, publicKey})
        })
    }else if(isEncrypted){
        return res.send({
            warning: "Your friend is not online"
        })
    }


    const result = await connectionModel.findByIdAndUpdate(chatId, {
        publicKey,
        isEncrypted,
    }, {new: true}).populate("senderId", "-password")
    .populate("receiverId", "-password")
    if(result){
        res.status(200).send({
            message: "Connection Encrypted Successfully",
            data: result
        })
    }else{
        res.status(400).send({
            message: "Connection Encrypted Failed",
            data: result
        })
    }
}

export default connectionEncryption;