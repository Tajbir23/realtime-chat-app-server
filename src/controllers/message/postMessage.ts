import { Request, Response } from "express";
import connectionModel from "../../models/connectionSchema";
import userModel from "../../models/userSchema";
import user from "../../interface/userInterface";
import messageModel from "../../models/messageSchema";
import { io } from "../..";

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
        const connection = await connectionModel.find({
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
        });

        if (connection && connection.length > 0) {
            chatId = connection[0]._id.toString();
        }

        if (!connection || connection.length === 0) {
            const createConnection = new connectionModel({
                senderId: sender._id,
                receiverId: receiver._id,
            });
            const { _id } = await createConnection.save();
            
            chatId = _id.toString();
        }

        if (chatId) {
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
                message,
            });
            const result = await messageSave.save();

            io.to(receiver.username).emit("message", result);
            io.to(sender.username).emit("message", result);
            
            return res.status(201).send(result);
        }

    } catch (error) {
        console.log('error', (error as any).message);
        return res.status(500).send({ error: (error as any).message });
    }
};

export default postMessage;
