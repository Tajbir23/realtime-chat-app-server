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

        const unseenIds = message.filter(msg => msg.senderId !== myId && !msg.seen).map(msg => msg.senderId);

        if(unseenIds.length > 0){
            await messageModel.updateMany({
                _id: { $in: unseenIds }
            }, {
                $set: {
                    seen: true
                }
            })
        }
        
        return message
    } catch (error) {
        console.log(error)
    }
}

export default getMessage;