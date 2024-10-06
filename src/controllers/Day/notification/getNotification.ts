import { Request, Response } from "express";
import notificationModel from "../../../models/notificationSchema";

const getNotification = async(req: Request, res: Response) => {
    const { _id } = (req as any).user;
    // console.log(userId);
    const notification = await notificationModel.find({ receiverId: _id }).sort({ createdAt: -1 }).populate("senderId").populate('receiverId').populate('postId');
    notification.forEach((item) => {
        item.isRead = true;
        item.save();
    });
    console.log(notification);
    res.send(notification);
}

export default getNotification;