import { io } from "../..";
import findOneUser from "../../controllers/findUser";
import getFriendsConnectionById from "../../controllers/friends/getFriendsConnection";
import userModel from "../../models/userSchema";
import addConnection from "./connection/addConnection";

const connectedUser = async(user: any, socket: any) => {
    // user real public ip address
      const clientIp = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;

      
      if(user?._id && user.uid){
        await addConnection(user?._id, socket.id, user.uid, clientIp);
      }
      
      const update = await userModel.updateOne(
        { email: user?.email },
        { $set: { isActive: true, socketId: socket.id, ip: clientIp } }
      );

      console.log("connectedUser user", user)
      const updatedUser = await findOneUser(user?._id);

      await getFriendsConnectionById(user?._id);
      io.emit("users", updatedUser);
}
export {connectedUser}