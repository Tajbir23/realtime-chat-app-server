// import { connectedUsers } from "..";

import redis from "../config/redis"

// const findSocketIdById = (id: string): string[] => {
//     // Check if the user exists in connectedUsers
//     if (connectedUsers[id]) {
//         // Get all the socket IDs (values) associated with the user's devices (deviceId keys)
//         return Object.values(connectedUsers[id]); // Returns array of socket IDs
//     }
//     return []; // Return an empty array if no sockets found
// };

// export default findSocketIdById;


const findSocketIdById = async (id: string): Promise<string[]> => {
    try {
        const sockets = await redis.hvals(`user:${id}`)
        return sockets.map(socket => JSON.parse(socket).socketId)
    } catch (error: any) {
        console.log(error.message)
        return []
    }
}

export default findSocketIdById;
