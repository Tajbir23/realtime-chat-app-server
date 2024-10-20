import { connectedUsers, io } from "../..";

const messageUser = async(message: any) => {

    const receiverId = message?.receiverId;

      for (let [socketId, userData] of connectedUsers.entries()) {
        if (userData._id === receiverId) {
          io.to(socketId).emit("upcomingMessage", message);
        }
      }
}
export {messageUser}