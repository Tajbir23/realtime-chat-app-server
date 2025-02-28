import { io } from "../..";
import findSocketIdById from "../../controllers/findSocketIdbyId";

const messageUser = async(message: any) => {

    const receiverId = message?.receiverId;

      // for (let [socketId, userData] of connectedUsers.entries()) {
      //   if (userData._id === receiverId) {
      //     io.to(socketId).emit("upcomingMessage", message);
      //   }
      // }
      const receiverSocketId = await findSocketIdById(receiverId)
      console.log("receiverSocketId", receiverSocketId)
      receiverSocketId.forEach(socketId => {
        console.log("socketId", socketId)
        io.to(socketId).emit("upcomingMessage", message);
      })
}
export {messageUser}