import { connectedUsers } from "../../.."

const detectMultipleConnection = (userId: string) => {
    const userDevices = connectedUsers[userId]
    const deviceCount = Object.values(userDevices).length;
    if(deviceCount > 0){
        console.log(`User ${userId} has multiple connected devices: ${deviceCount}`);
        return true;
    }
}

export default detectMultipleConnection