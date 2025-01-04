import { connectedUsers, io } from "../..";
import findOneUser from "../../controllers/findUser";
import getFriendsConnectionById from "../../controllers/friends/getFriendsConnection";
import userModel from "../../models/userSchema";
import findUserIdBySocketId from "./connection/findUserIdBySocketId";
import removeConnection from "./connection/removeConnection";

const logOutUser = async(socket: any) => {

    const userId = await findUserIdBySocketId(socket.id);
      if (userId) {
        const update = await userModel.findByIdAndUpdate(
          { _id: userId },
          { isActive: false, lastActive: Number(Date.now()), socketId: null }
        );
        const updatedUser = await findOneUser(userId);
        io.emit("users", updatedUser);

        await removeConnection(socket.id);

        await getFriendsConnectionById(userId);
        socket.disconnect();
      }
}
export {logOutUser}