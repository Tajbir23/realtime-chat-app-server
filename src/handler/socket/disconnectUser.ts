import { io } from "../..";
import findOneUser from "../../controllers/findUser";
import deleteMyEncryptedMessage from "../../controllers/friends/encryption/deleteMyEncryptedMessage";
import getFriendsConnectionById from "../../controllers/friends/getFriendsConnection";
import userModel from "../../models/userSchema";
import findUserIdBySocketId from "./connection/findUserIdBySocketId";
import removeConnection from "./connection/removeConnection";

const disconnectUser = async(socket: any) => {

    console.log("disconnectUser socket id", socket.id)
    const userId = await findUserIdBySocketId(socket.id);

    console.log("disconnect user",userId)
      if (userId) {
        const removeActiveSocketId = await removeConnection(socket.id);

        console.log("disconnectUser removeActive", removeActiveSocketId)
        if(removeActiveSocketId){
          const update = await userModel.findByIdAndUpdate(
            { _id: userId },
            { isActive: false, lastActive: Number(Date.now()), socketId: null }
          );
          const upDatedUser = await findOneUser(userId);
          console.log("disconnect", userId);
          io.emit("users", upDatedUser);
          await getFriendsConnectionById(userId);
          
          await deleteMyEncryptedMessage(userId)
        }
        // console.log("Active users",connectedUsers)
      }
}
export {disconnectUser}