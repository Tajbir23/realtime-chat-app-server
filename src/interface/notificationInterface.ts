interface notificationInterface {
    senderId: string;
    receiverId: string;
    type: string;
    isRead: boolean;
    postId: string;
}

export default notificationInterface;