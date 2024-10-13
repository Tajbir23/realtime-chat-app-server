// import { connectedUsers } from ".."

import { pubClient } from "../config/redis";

const findSocketIdByEmail = async(email: string) => {
    const connectedUsers = await pubClient.hGetAll("connectedUsers");
    for(let [socketId, userData] of Object.entries(connectedUsers)){
        const user = JSON.parse(userData);
        if(user.email === email){
            return socketId;
        }
    }
    return null;
}

export default findSocketIdByEmail;