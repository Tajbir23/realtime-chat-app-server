import { connectedUsers } from "..";

const findSocketIdById = (id: string): string[] => {
    // Check if the user exists in connectedUsers
    if (connectedUsers[id]) {
        // Get all the socket IDs (values) associated with the user's devices (deviceId keys)
        return Object.values(connectedUsers[id]); // Returns array of socket IDs
    }
    return []; // Return an empty array if no sockets found
};

export default findSocketIdById;
