// import { connectedUsers } from "../../..";

import redis from "../../../config/redis"


// const addConnection = (userId: string, socketId: string, deviceId: string) => {
//     console.log("device id", deviceId)
    
//     if (!connectedUsers[userId]) {
       
//         connectedUsers[userId] = {
//             [deviceId]: socketId,
//         };
//     } else {
//         const userDevices = connectedUsers[userId];

//         userDevices[deviceId] = socketId;
//     }

// };

// export default addConnection;


const addConnection = async (userId: string, socketId: string, deviceId: string, clientIp: string) => {
    
    console.log("addConnection socket id", socketId)
    try {
        await redis.hset(`user:${userId}`, deviceId, JSON.stringify({ socketId, clientIp }));
        // console.log(`${userId} connected with ${deviceId} and ip ${clientIp}`)
    } catch (error: any) {
        console.log(error)
        console.log(error.message)
    }
}

export default addConnection;
