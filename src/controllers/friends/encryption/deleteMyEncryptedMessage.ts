import messageModel from "../../../models/messageSchema";

const deleteMyEncryptedMessage = async (userId: string) => {
    try {
        // Step 1: Permanently delete messages if `deletedFor` already contains any ID except the current user's
        await messageModel.deleteMany({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ],
            isEncrypted: true,
            deletedFor: { $ne: userId } // If `deletedFor` contains a different user's ID, delete the message
        });

        // Step 2: If `deletedFor` does not contain current user's ID, add the userId to `deletedFor`
        await messageModel.updateMany({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ],
            isEncrypted: true,
            deletedFor: { $ne: userId } // Only update if user's ID is not already in `deletedFor`
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


