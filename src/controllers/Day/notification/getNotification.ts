import { Request, Response } from "express";
import notificationModel from "../../../models/notificationSchema";

const getNotification = async(req: Request, res: Response) => {
    const { _id } = (req as any).user;
    const {page, limit} = req.query
    // console.log(userId);
    const startIndex = (page as unknown as number) * Number(limit)
    // const endIndex = startIndex + Number(limit) as unknown as number;
    const notification = await notificationModel.find({ receiverId: _id }).sort({ time: -1 }).skip(startIndex).limit(limit as unknown as number).populate("senderId", "-password").populate('receiverId', '-password').populate('postId');
    notification.forEach((item) => {
        item.isRead = true;
        item.save();
    });
    // console.log(notification);
    res.send(notification);
}

export default getNotification;