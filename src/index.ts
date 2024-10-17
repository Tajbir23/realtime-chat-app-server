import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import connection from "./config/db";
import router from "./router/routes";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import userModel from "./models/userSchema";
import getFriendsConnectionById from "./controllers/friends/getFriendsConnection";
import findOneUser from "./controllers/findUser";
import cron from 'node-cron'
import findSocketIdById from "./controllers/findSocketIdbyId";
import os from "os"
// import { pid } from "node:process";

const numCPUs = os.cpus().length;
console.log("processor core : ", numCPUs)
const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat.tajbirideas.com",
      "https://realtime-chat-app-tajbir.web.app",
      "https://g4pnft81-5173.inc1.devtunnels.ms",
    ],
    // origin: "*",
  },
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat.tajbirideas.com",
      "https://realtime-chat-app-tajbir.web.app",
      "https://g4pnft81-5173.inc1.devtunnels.ms",
    ],
    // origin: "*",
  })
);

app.use(express.json());

connection();

app.get("/", async (req: Request, res: Response) => {
  // let value = 1000000
  // while (value > 0) {
  //   value--;
  // }
  // console.log(`handling the request using ${pid}`)
  res.send("Hello, World!");
});

app.use("/api", router);

export const connectedUsers = new Map<string, { email: string; _id: string, ip: string }>();

io.on("connection", (socket) => {
  socket.on("connected", async (user: any) => {
    const ip = socket.handshake.address;
    console.log(`User connected from ${ip}`);

    connectedUsers.set(socket.id, { email: user?.email, _id: user?._id, ip });
    const update = await userModel.updateOne(
      { email: user?.email },
      { $set: { isActive: true, socketId: socket.id } }
    );
   
    const updatedUser = await findOneUser(user?._id);

    await getFriendsConnectionById(user?._id);
    io.emit("users", updatedUser);

    // console.log("Active users",connectedUsers)
  });

  socket.on("sendUpcomingMessage", (message) => {
    const receiverId = message?.receiverId;
    
    for (let [socketId, userData] of connectedUsers.entries()) {
      if (userData._id === receiverId) {
        io.to(socketId).emit("upcomingMessage", message);
      }
    }
  });

  socket.on("logout", async () => {
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
  });
  socket.on("disconnect", async () => {
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
  });

});


// cron job for update my day
cron.schedule('0 * * * *', async () => {
  console.log('Running cron job');
  const now = Date.now()
  const BATCH_SIZE = 100
  await userModel.updateMany({myDayEndAt: {$lt: now}, isActiveMyDay: true}, {$set: {isActiveMyDay: false, myDayId: null, myDay: null}}).limit(BATCH_SIZE)
})
// export default server
server.listen(port, async () => {
  console.log("Server is running on port 3000");
});
