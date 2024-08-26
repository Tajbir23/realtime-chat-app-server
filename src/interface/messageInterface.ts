interface messageInterface {
    chatId: string;
    senderName: string;
    senderUsername: string;
    senderEmail: string;
    senderPhotoUrl: string;
    receiverName: string;
    receiverUsername: string;
    receiverEmail: string;
    receiverPhotoUrl: string;
    message: string;
    createdAt: Date;
}

export default messageInterface;