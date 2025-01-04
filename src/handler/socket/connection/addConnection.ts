import { connectedUsers } from "../../..";


const addConnection = (userId: string, socketId: string, deviceId: string) => {
    console.log("device id", deviceId)
    
    if (!connectedUsers[userId]) {
       
        connectedUsers[userId] = {
            [deviceId]: socketId,
        };
    } else {
        const userDevices = connectedUsers[userId];

        userDevices[deviceId] = socketId;
    }

};

export default addConnection;
