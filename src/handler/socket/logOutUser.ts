import { connectedUsers, io } from "../..";
import findOneUser from "../../controllers/findUser";
import getFriendsConnectionById from "../../controllers/friends/getFriendsConnection";
import userModel from "../../models/userSchema";

const logOutUser = async(socket: any) => {

    const user: any = connectedUsers.get(socket.id);
      if (user) {
        const update = await userModel.updateOne(
          { email: user.email },
          { isActive: false, lastActive: Number(Date.now()), socketId: null }
        );
        const updatedUser = await findOneUser(user._id);
        io.emit("users", updatedUser);
        connectedUsers.delete(socket.id);
        await getFriendsConnectionById(user._id);
        socket.disconnect();
      }
}
export {logOutUser}