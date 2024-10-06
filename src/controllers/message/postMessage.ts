import { Request, Response } from "express";
import connectionModel from "../../models/connectionSchema";
import userModel from "../../models/userSchema";
import user from "../../interface/userInterface";
import messageModel from "../../models/messageSchema";
import getLastMsgFriend from "../friends/getLastMsgFriend";
import { io } from "../..";
import findSocketIdByEmail from "../findSocketIdByEmail";

const postMessage = async (req: Request, res: Response) => {
    const senderData = (req as any).user;
    const receiver = req.body.user;
    const message = req.body.message;

    
    try {

        // Ensure receiver has the necessary properties
        if (!receiver || !receiver.username || !receiver.name || !receiver.email || !receiver.photoUrl) {
            throw new Error('Receiver data is incomplete');
        }

        const sender: user | null = await userModel.findOne({ username: senderData.username });

        if (!sender) {
            throw new Error('Sender not found');
        }

        let chatId = "";
        const connection = await connectionModel.findOneAndUpdate({
            $or: [
                {
                    senderId: sender._id,
                    receiverId: receiver._id
                },
                {
                    senderId: receiver._id,
                    receiverId: sender._id
                }
            ]
        },{
            lastMessage: message,
            lastMessageAt: Number(Date.now()),
        });


        if (connection) {
            chatId = connection._id.toString()
        }

        if (!connection) {
            const createConnection = new connectionModel({
                senderId: sender._id,
                receiverId: receiver._id,
                lastMessage: message,
                lastMessageAt: Number(Date.now()),
            });
            const { _id } = await createConnection.save();
            
            chatId = _id.toString();
        }

        if (chatId) {
            const messageSave = new messageModel({
                chatId,
                senderId: sender._id,
                senderName: sender.name,
                senderUsername: sender.username,
                senderEmail: sender.email,
                senderPhotoUrl: sender.photoUrl,
                receiverId: receiver._id,
                receiverName: receiver.name,
                receiverUsername: receiver.username,
                receiverEmail: receiver.email,
                receiverPhotoUrl: receiver.photoUrl,
                message,
            });
            const result = await messageSave.save();

            
            
            const receiverSocketId = await findSocketIdByEmail(receiver.email)
            const senderSocketId = await findSocketIdByEmail(sender.email)
            

            if(receiverSocketId){
                io.to(receiverSocketId).emit("message", result);
            }

            if(senderSocketId){
                io.to(senderSocketId).emit("message", result);
            }

            // io.emit("message", result);

            await getLastMsgFriend(receiver._id)

            // io.emit("lastMessage", getLastMsgFriend);

            return res.status(201).send(result);
        }

    } catch (error) {
        console.log(error)
        console.log('error', (error as any).message);
        return res.status(500).send({ error: (error as any).message });
    }
};

export default postMessage;
