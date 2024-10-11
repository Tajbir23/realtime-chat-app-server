
interface userConnections {
    senderId: string;
    receiverId: string;
    lastMessage: string;
    lastMessageAt: Number;
    blockUserId: string;
    isBlock: boolean;
    blockSender: string;
    theme: string;
    themeUpdateBy: string;
}

export default userConnections