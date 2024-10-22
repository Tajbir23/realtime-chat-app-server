import { connectedUsers } from "../../..";

const addConnection = (userId: string, socketId: string) => {
    // Check if the userId exists in connectedUsers
    if (!connectedUsers[userId]) {
        // If not, create a new entry with the socketId in an array
        connectedUsers[userId] = [socketId];
    } else {
        // If the userId exists, check if the socketId is already present
        if (!connectedUsers[userId].includes(socketId)) {
            // If not present, add the new socketId
            connectedUsers[userId].push(socketId);
        } else {
            // If the socketId is already stored, update the array if necessary
            // Here you can implement any update logic you want.
            // For example, you might want to refresh the socketId or simply log it.
            console.log(`Socket ID ${socketId} is already connected for user ${userId}.`);
        }
    }
    console.log("Updated connectedUsers:", connectedUsers);
};

export default addConnection;
