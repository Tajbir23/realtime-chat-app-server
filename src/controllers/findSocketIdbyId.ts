import { connectedUsers } from ".."

const findSocketIdById = (id: string) => {
    if(connectedUsers[id]){
        return connectedUsers[id]
    }
    return []
}

export default findSocketIdById;