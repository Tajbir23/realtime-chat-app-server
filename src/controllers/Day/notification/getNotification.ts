import { Request, Response } from "express";
import notificationModel from "../../../models/notificationSchema";

const getNotification = async (req: Request, res: Response) => {
    try {
        const { _id } = (req as any).user;
        const page = Number(req.query.page) || 0;  // Default page to 0 if not provided
        const limit = Number(req.query.limit) || 10; // Default limit to 10 if not provided

        const startIndex = page * limit;

        const notifications = await notificationModel
            .find({ receiverId: _id })
            .sort({ time: -1 })  // Recent to last by time
            .skip(startIndex)
            .limit(limit)
            .populate("senderId", "-password")
            .populate("receiverId", "-password")
            .populate("postId");

        
        await Promise.all(
            notifications.map(async (item) => {
                item.isRead = true;
                await item.save();
            })
        );

        res.status(200).send(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).send({ error: "Failed to fetch notifications." });
    }
};

export default getNotification;
