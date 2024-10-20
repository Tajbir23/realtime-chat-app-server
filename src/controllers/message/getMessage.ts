import messageModel from "../../models/messageSchema";

const getMessage = async(senderUsername: string, receiverUsername: string, myId: string, skip?: number) => {
    try {
        const message = await messageModel.find({
            $or: [
                {
                    senderUsername,
                    receiverUsername
                },
                {
                    senderUsername: receiverUsername,
                    receiverUsername: senderUsername
                }
            ],
            deletedFor: { $ne: myId },
            
        }).sort({createdAt: -1}).skip(skip ?? 0).limit(10);

        return message
    } catch (error) {
        console.log(error)
    }
}

export default getMessage;