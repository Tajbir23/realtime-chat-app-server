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

        // Find the sender in the database
        const sender: user | null = await userModel.findOne({ username: senderData.username });

        if (!sender) {
            throw new Error('Sender not found');
        }

        // Find an existing connection or create a new one
        const connection = await connectionModel.findOneAndUpdate(
            {
                $or: [
                    { senderId: sender._id, receiverId: receiver._id },
                    { senderId: receiver._id, receiverId: sender._id }
                ]
            },
            {},
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Save the message
        const messageSave = new messageModel({
            chatId: connection._id.toString(),
            senderName: sender.name,
            senderUsername: sender.username,
            senderEmail: sender.email,
            senderPhotoUrl: sender.photoUrl,
            receiverName: receiver.name,
            receiverUsername: receiver.username,
            receiverEmail: receiver.email,
            receiverPhotoUrl: receiver.photoUrl,
            message
        });

        const result = await messageSave.save();

        // Emit the message event to all connected clients
        io.emit("message", result);

        return res.status(201).send(result);

    } catch (error) {
        console.log('Error:', (error as any).message);
        return res.status(500).send({ error: (error as any).message });
    }
};

export default postMessage;
