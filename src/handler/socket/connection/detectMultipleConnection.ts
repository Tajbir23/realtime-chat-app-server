// import { connectedUsers } from "../../.."

import redis from "../../../config/redis";

// const detectMultipleConnection = (userId: string) => {
//     const userDevices = connectedUsers[userId]
//     const deviceCount = Object.values(userDevices).length;
//     if(deviceCount > 1){
//         console.log(`User ${userId} has multiple connected devices: ${deviceCount}`);
//         return true;
//     }
// }

// export default detectMultipleConnection



const detectMultipleConnection = async (userId: string): Promise<boolean> => {
    try {
        // Use Redis hlen to get the number of devices for the user
        const deviceCount = await redis.hlen(`user:${userId}`);
        
        if (deviceCount > 1) {
            console.log(`User ${userId} has multiple connected devices: ${deviceCount}`);
            return true;
        }
    } catch (error) {
        console.error("Error detecting multiple connections:", error);
    }
    return false;
};

export default detectMultipleConnection;
