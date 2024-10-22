import { connectedUsers } from "../../.."

const removeConnection = (socketId: string) => {
    for(const userId in connectedUsers){
        const socketIds = connectedUsers[userId]

        if(socketIds.includes(socketId)){
            connectedUsers[userId] = socketIds.filter(id => id !== socketId)

            if(connectedUsers[userId].length === 0){
                delete connectedUsers[userId]
            }
            break;
        }
    }
}

export default removeConnection