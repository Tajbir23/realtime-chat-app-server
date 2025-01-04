import { Request, Response } from "express";
import connectionModel from "../../../models/connectionSchema";
import messageModel from "../../../models/messageSchema";
import findSocketIdById from "../../findSocketIdbyId";
import { io } from "../../..";
import detectMultipleConnection from "../../../handler/socket/connection/detectMultipleConnection";

const connectionEncryption = async(req: Request, res: Response) => {
    const {_id} = (req as any).user
    const {chatId, publicKey, isEncrypted, encryptPrivateKey, receiver} = req.body;
    
    if(!isEncrypted){
        await messageModel.deleteMany({chatId, isEncrypted: true})
    }

   
    const receiverSocketId = await findSocketIdById(receiver)
    const senderSocketId = await findSocketIdById(_id)

    if(receiverSocketId && senderSocketId){
        const multipleConnectionReceiver = await detectMultipleConnection(receiver)
        const multipleConnectionSender = await detectMultipleConnection(_id)

        if(multipleConnectionSender){
            return res.send({
                warning: "You have multiple active connections"
            })
        }
        
        if(multipleConnectionReceiver){
            return res.send({
                warning: "Your friend has multiple active connections"
            })
        }


        receiverSocketId.forEach(socketId => {
            io.to(socketId).emit('privateKey', {privateKey: encryptPrivateKey, _id: chatId, isEncrypted, publicKey})
        })
        senderSocketId.forEach(socketId => {
            io.to(socketId).emit('privateKey', {privateKey: encryptPrivateKey, _id: chatId, isEncrypted, publicKey})
        })
    }else if(isEncrypted){
        return res.send({
            warning: "Your friend must be online"
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