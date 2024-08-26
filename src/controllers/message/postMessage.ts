import { Request, Response } from "express";
import connectionModel from "../../models/connectionSchema";
import userModel from "../../models/userSchema";
import user from "../../interface/userInterface";
import messageModel from "../../models/messageSchema";

const postMessage = async(req: Request, res: Response) => {
    const senderData = (req as any).user
    const receiver = req.body.user
    const message = req.body.message
    
try {
        const sender: user | null = await userModel.findOne({username: senderData.username})

        if (!sender) {
            throw new Error('Sender not found')
        }

        let chatId = ""
        const connection = await connectionModel.find({
            $or: [
                {
                    senderUserName: sender.username,
                    receiverUserName: receiver.username
                },
                {
                    senderUserName: receiver.username,
                    receiverUserName: sender.username
                }
            ]
        })

        if (connection && connection.length > 0) {
            chatId = connection[0]._id.toString()
        }

        if (!connection || connection.length === 0) {
            const createConnection = new connectionModel({
                senderName: sender.name,
                senderUsername: sender.username,
                senderEmail: sender.email,
                senderPhotoUrl: sender.photoUrl,
                receiverName: receiver.name,
                receiverUsername: receiver.username,
                receiverEmail: receiver.email,
                receiverPhotoUrl: receiver.photoUrl
            })
            const {_id} = await createConnection.save()
            chatId = _id.toString()
        }

        if(chatId){
            const messageSave = new messageModel({
                chatId,
                senderName: sender.name,
                senderUsername: sender.username,
                senderEmail: sender.email,
                senderPhotoUrl: sender.photoUrl,
                receiverName: receiver.name,
                receiverUsername: receiver.username,
                receiverEmail: receiver.email,
                receiverPhotoUrl: receiver.photoUrl,
                message
            })
            const result = await messageSave.save()
            return res.status(201).send(result)
        }
        
    } catch (error) {
        
    }
}

export default postMessage;