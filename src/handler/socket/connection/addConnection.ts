import { connectedUsers } from "../../..";


const addConnection = (userId: string, socketId: string, deviceId: string) => {
    console.log("device id", deviceId)
    // Check if the userId exists in connectedUsers
    if (!connectedUsers[userId]) {
        // Create a new entry for the userId and deviceId with the socketId
        connectedUsers[userId] = {
            [deviceId]: socketId, // Store the socketId for this deviceId
        };
    } else {
        const userDevices = connectedUsers[userId];

        // Always update the deviceId with the new socketId
        userDevices[deviceId] = socketId; // This replaces the old socketId for the same device
    }

};

export default addConnection;
