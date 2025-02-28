// import { connectedUsers } from "../../..";

import redis from "../../../config/redis"

// const findUserIdBySocketId = (socketId: string): string | undefined => {
//     console.log("findUserIdBySocketId:", socketId);
//     console.log("Connected Users:", connectedUsers);

//     // Iterate through all userIds in connectedUsers
//     for (const userId in connectedUsers) {
//         const userDevices = connectedUsers[userId]; // Object containing deviceId: socketId pairs

//         // Iterate through all deviceIds for the current user
//         for (const deviceId in userDevices) {
//             // Check if the socketId matches
//             if (userDevices[deviceId] === socketId) {
//                 return userId; // Return the userId if socketId is found
//             }
//         }
//     }

//     return undefined; // Return undefined if no user found with the socketId
// };

// export default findUserIdBySocketId;

const findUserIdBySocketId = async (socketId: string) => {
    console.log("findUserBySocketId",socketId)
    try {
        const keys = await redis.keys(`user:*`)
        for (const key of keys) {
            const devices = await redis.hgetall(key)
            for (const deviceId in devices) {
                const device = JSON.parse(devices[deviceId])
                if (device.socketId === socketId) {
                    
                    return key.split(":")[1]
                }
            }
        }
    } catch (error:any) {
        console.log("findUserIdBySocketId error", error.message)
    }
}

export default findUserIdBySocketId;
