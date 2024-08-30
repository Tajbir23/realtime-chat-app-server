
interface userConnections {
    senderName: string;
    senderEmail: string;
    senderPhotoUrl: string;
    senderUserName: string;
    receiverName: string;
    receiverEmail: string;
    receiverPhotoUrl: string;
    receiverUserName: string;
    timestamp?: Date;
}

export default userConnections