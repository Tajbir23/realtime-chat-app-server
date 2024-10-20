import { connectedUsers, io } from "../..";
import findOneUser from "../../controllers/findUser";
import getFriendsConnectionById from "../../controllers/friends/getFriendsConnection";
import userModel from "../../models/userSchema";

const disconnectUser = async(socket: any) => {

    const user: any = connectedUsers.get(socket.id);
      if (user) {
        const update = await userModel.updateOne(
          { email: user.email },
          { isActive: false, lastActive: Number(Date.now()), socketId: null }
        );
        const upDatedUser = await findOneUser(user._id);
        console.log("disconnect", user._id);
        io.emit("users", upDatedUser);
        await getFriendsConnectionById(user._id);
        connectedUsers.delete(socket.id);

        // console.log("Active users",connectedUsers)
      }
}
export {disconnectUser}