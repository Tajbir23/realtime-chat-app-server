import { connectedUsers } from "../../..";

const removeConnection = (socketId: string) => {
    // Iterate over each userId in connectedUsers
    for (const userId in connectedUsers) {
        const userDevices = connectedUsers[userId]; // Object containing deviceId: socketId pairs

        // Iterate over the deviceIds for the current user
        for (const deviceId in userDevices) {
            // Check if the current socketId matches
            if (userDevices[deviceId] === socketId) {
                // Remove the device (i.e., remove the deviceId from connectedUsers)
                delete connectedUsers[userId][deviceId];

                // If the user no longer has any connected devices, remove the user entry
                if (Object.keys(connectedUsers[userId]).length === 0) {
                    delete connectedUsers[userId];
                    return 0
                }

                console.log(`Removed connection for socketId: ${socketId}`);
                return;
            }
        }
    }
    console.log(`No connection found for socketId: ${socketId}`);
};

export default removeConnection;
