import { connectedUsers, io } from "../..";
import findOneUser from "../../controllers/findUser";
import getFriendsConnectionById from "../../controllers/friends/getFriendsConnection";
import userModel from "../../models/userSchema";
import addConnection from "./connection/addConnection";

const connectedUser = async(user: any, socket: any) => {
    // const ip = socket.handshake.address;
      // console.log(`User connected from ${ip}`);

      console.log("connectedUser",user)
      
      if(user?._id && user.uid){
        await addConnection(user?._id, socket.id, user.uid);
      }
      
      const update = await userModel.updateOne(
        { email: user?.email },
        { $set: { isActive: true, socketId: socket.id } }
      );

      const updatedUser = await findOneUser(user?._id);

      await getFriendsConnectionById(user?._id);
      io.emit("users", updatedUser);
}
export {connectedUser}