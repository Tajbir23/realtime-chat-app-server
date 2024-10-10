
interface userConnections {
    senderId: string;
    receiverId: string;
    lastMessage: string;
    lastMessageAt: Number;
    blockUserId: string;
    isBlock: boolean;
    blockSender: string;
}

export default userConnections