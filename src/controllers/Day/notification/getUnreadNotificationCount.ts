import { Request, Response } from "express";
import notificationModel from "../../../models/notificationSchema";

const getUnreadNotificationCount = async(req: Request, res: Response) => {
    const { _id } = (req as any).user;
    const notification = await notificationModel.countDocuments({ receiverId: _id, isRead: false })
    res.send({notificationCount: notification});
}

export default getUnreadNotificationCount;