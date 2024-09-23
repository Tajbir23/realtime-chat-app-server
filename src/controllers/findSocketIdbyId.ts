import { connectedUsers } from ".."

const findSocketIdById = (id: string) => {
    for(let [socketId, userData] of connectedUsers.entries()){
        if(userData._id === id){
            return socketId;
        }
    }
}

export default findSocketIdById;