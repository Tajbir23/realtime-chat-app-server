interface notificationInterface {
    senderId: string;
    receiverId: string;
    type: string;
    isRead: boolean;
    postId: string;
    time: number;
}

export default notificationInterface;