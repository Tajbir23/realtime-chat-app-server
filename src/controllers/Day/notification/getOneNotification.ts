import notificationModel from "../../../models/notificationSchema";

const getOneNotification = async (_id: string) => {
    const notification = await notificationModel.findById(_id).populate('senderId', '-password').populate('receiverId', '-password').populate('postId');
    return notification;
}

export default getOneNotification;