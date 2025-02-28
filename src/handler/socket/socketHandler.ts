import { Server } from "socket.io";
import { connectedUser } from "./connectedUser";
import { messageUser } from "./messageUser";
import { logOutUser } from "./logOutUser";
import { disconnectUser } from "./disconnectUser";

const setUpSocketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("connected", async (user: any) => {
      console.log("setUpSocketHandler connected user", user)
      if(user?._id){
        connectedUser(user, socket)
      }
    });

    socket.on("sendUpcomingMessage", (message) => {
      messageUser(message)
    });

    socket.on("logout", async () => {
      logOutUser(socket)
    });

    socket.on("disconnect", async () => {
      disconnectUser(socket)
    });

    
  });
};
export default setUpSocketHandler;
