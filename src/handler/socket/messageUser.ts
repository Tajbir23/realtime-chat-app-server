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
      receiverSocketId.forEach(socketId => {
        io.to(socketId).emit("upcomingMessage", message);
      })
}
export {messageUser}