import { connectedUsers } from "../../..";

const findUserIdBySocketId = (socketId: string) => {
    console.log("findUserIdBySocketId",socketId)
    console.log(connectedUsers)
    for(const userId in connectedUsers){
        if(connectedUsers[userId].includes(socketId)){
            return userId
        }
    }
}

export default findUserIdBySocketId;