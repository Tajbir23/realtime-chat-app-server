import connectionModel from "../../models/connectionSchema";
import getFriendsConnectionById from "./getFriendsConnection";

const blockFriend = async(_id: string, chatId: string, blockUserId: string, isBlock: boolean) => {
    
    try {
        await connectionModel.updateOne(
            { _id: chatId },
            { $set: { blockUserId, isBlock, blockSender: _id } },
        );
        const updated = await connectionModel.findOne({_id: chatId})
        console.log("updated connection", updated)
        await getFriendsConnectionById(blockUserId)
        
    } catch (error) {
        console.error(error);
    }
}

export default blockFriend