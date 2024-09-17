import { connectedUsers } from ".."

const findSocketIdByEmail = (email: string) => {
    for(let [socketId, userData] of connectedUsers.entries()){
        if(userData.email === email){
            return socketId;
        }
    }
}

export default findSocketIdByEmail;