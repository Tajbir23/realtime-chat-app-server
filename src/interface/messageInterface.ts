interface messageInterface {
    chatId: string;
    senderId: string;
    senderName: string;
    senderUsername: string;
    senderEmail: string;
    senderPhotoUrl: string;
    receiverId: string;
    receiverName: string;
    receiverUsername: string;
    receiverEmail: string;
    receiverPhotoUrl: string;
    message: string;
    seen: boolean;
    isEncrypted: boolean;
    deletedFor: string;
    deleteEveryOne: boolean;
    edited: boolean;
    unsent: boolean;
    emoji: string;
    createdAt: Date;
}

export default messageInterface;