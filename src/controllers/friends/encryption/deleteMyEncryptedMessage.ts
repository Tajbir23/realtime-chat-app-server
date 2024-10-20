import connectionModel from "../../../models/connectionSchema";
import messageModel from "../../../models/messageSchema";

const deleteMyEncryptedMessage = async (userId: string) => {
    try {
        // Step 1: Update `connectionModel` to set `isEncrypted` to false for the user's connections
        await connectionModel.updateMany({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ],
            isEncrypted: true
        }, {
            $set: { isEncrypted: false }
        });

        // Step 2: Permanently delete messages where `deletedFor` contains an opponent's ID
        await messageModel.deleteMany({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ],
            isEncrypted: true,
            deletedFor: { $ne: userId } // Only delete if user's ID is not in `deletedFor`
        });

        // Step 3: If the message is not deleted for anyone, set `deletedFor` to the user's ID
        await messageModel.updateMany({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ],
            isEncrypted: true,
            deletedFor: { $exists: false } // Ensure `deletedFor` field is empty
        }, {
            $set: { deletedFor: userId }
        });

        console.log("Messages processed successfully.");
    } catch (error) {
        console.error("Error processing messages:", error);
        throw new Error("Could not process messages.");
    }
};

export default deleteMyEncryptedMessage;
