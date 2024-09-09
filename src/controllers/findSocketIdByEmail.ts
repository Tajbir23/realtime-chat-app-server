import { connectedUsers } from ".."

const findSocketIdByEmail = (email: string) => {
    for(let [socketId, storedEmail] of connectedUsers.entries()){
        if(storedEmail === email){
            return socketId;
        }
    }
}

export default findSocketIdByEmail;