// import { connectedUsers } from "../../..";

import redis from "../../../config/redis";

// const removeConnection = (socketId: string) => {
//     // Iterate over each userId in connectedUsers
//     for (const userId in connectedUsers) {
//         const userDevices = connectedUsers[userId]; // Object containing deviceId: socketId pairs

//         // Iterate over the deviceIds for the current user
//         for (const deviceId in userDevices) {
//             // Check if the current socketId matches
//             if (userDevices[deviceId] === socketId) {
//                 // Remove the device (i.e., remove the deviceId from connectedUsers)
//                 delete connectedUsers[userId][deviceId];

//                 // If the user no longer has any connected devices, remove the user entry
//                 if (Object.keys(connectedUsers[userId]).length === 0) {
//                     delete connectedUsers[userId];
//                     return 0
//                 }

//                 console.log(`Removed connection for socketId: ${socketId}`);
//                 return;
//             }
//         }
//     }
//     console.log(`No connection found for socketId: ${socketId}`);
// };

// export default removeConnection;

const removeConnection = async (socketId: string) => {
    console.log("removeConnection", socketId)
    try {
        const keys = await redis.keys(`user:*`)
        
        for (let key of keys) {

            const userDevices = await redis.hgetall(key)
            for (const deviceId in userDevices) {
                console.log("removeConnection deviceId", deviceId)
                const userSocketId = JSON.parse(userDevices[deviceId])
                
                if (userSocketId.socketId === socketId) {
                    await redis.hdel(key, deviceId)
                    
                    // If no more devices, remove the entire hash
                    const remainingDevices = await redis.hlen(key)
                    console.log("removeConnection remaining devices", remainingDevices)
                    if (remainingDevices === 0) {
                        await redis.del(key)
                        return true
                    }
                    
                    console.log(`Removed connection for socketId: ${socketId}`)
                    return true
                }
            }
        }
    } catch (error:any) {
        console.log("removeConnection error", error.message)
        return false
    }
}

export default removeConnection;
