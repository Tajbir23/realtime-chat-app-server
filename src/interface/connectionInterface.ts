
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
    themeType: string;
    deleteFor: string;
    delete: boolean;
    publicKey: string;
    isEncrypted: boolean;
}

export default userConnections