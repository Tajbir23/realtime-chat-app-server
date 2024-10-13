import { pubClient } from "../config/redis";


const findSocketIdById = async(id: string) => {
    const socketId = await pubClient.hGet('idToSocketId', id)
    return socketId;
}

export default findSocketIdById;