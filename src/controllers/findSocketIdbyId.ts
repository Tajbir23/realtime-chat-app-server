import { pubClient } from "../config/redis";


const findSocketIdById = async(id: string) => {
    const userId = await id.toString()
    // console.log('find socket id', userId)
    const socketId = await pubClient.hGet('idToSocketId', userId)
    // console.log('find socket by socketId',socketId)
    return socketId;
}

export default findSocketIdById;