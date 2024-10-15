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
import cron from 'node-cron';
import cluster from "node:cluster";
import os from "node:os";
import { createAdapter } from "socket.io-redis";
import { pubClient, subClient } from "./config/redis";
import { pid } from "node:process";

const numCPUs = os.cpus().length;
// const numCPUs = 2;
const port = process.env.PORT || 3000;

// Redis setup for shared state in a clustered environment


let io: Server | null = null;

if (cluster.isMaster) {
  console.log(`Master process is running on PID: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting a new worker...`);
    cluster.fork();
  });

  cron.schedule('0 * * * *', async () => {
    console.log('Running cron job');
    const now = Date.now()
    const BATCH_SIZE = 100
    await userModel.updateMany({myDayEndAt: {$lt: now}, isActiveMyDay: true}, {$set: {isActiveMyDay: false, myDayId: null, myDay: null}}).limit(BATCH_SIZE)
  })
  
} else {
  const app = express();
  const server = createServer(app);

  // Initialize Socket.io with Redis adapter
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://chat.tajbirideas.com",
        "https://realtime-chat-app-tajbir.web.app",
        "https://g4pnft81-5173.inc1.devtunnels.ms",
      ],
    },
  });

  // Use Redis adapter for Socket.io
  // io.adapter(createAdapter({pubClient, subClient}));
  
  app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://chat.tajbirideas.com",
      "https://realtime-chat-app-tajbir.web.app",
      "https://g4pnft81-5173.inc1.devtunnels.ms",
    ],
  }));

  app.use(express.json());
  connection();

  app.get("/", async (req: Request, res: Response) => {
    let value = 1000000
  while (value > 0) {
    value--;
  }
  console.log(`handling the request using ${pid}`)
  res.send("Hello, World!");
  });

  app.use("/api", router);

  // Socket.io connection with Redis-based connected users
  io.on("connection", (socket) => {
    socket.on("connected", async (user: any) => {
      const ip = socket.handshake.address;
      const userId = user?._id;

      console.log(socket.id, userId)


      const update = await userModel.findOneAndUpdate(
        { email: user?.email },
        { $set: { isActive: true, socketId: socket.id } }, {new: true}
      );

      if(userId){
        await pubClient.hSet('idToSocketId', userId, socket.id);
      }

      // const updatedUser = await findOneUser(user?._id);
      await getFriendsConnectionById(userId);
      io?.emit("users", update);
    });

    socket.on("sendUpcomingMessage", async (message) => {
      const receiverId = message?.receiverId;
      console.log('receiverId', receiverId)
      // const connectedUsers = await pubClient.hGetAll("connectedUsers");
      const socketId = await pubClient.hGet('idToSocketId', receiverId)
      console.log('socketId', socketId)
      if(socketId){
        io?.to(socketId).emit("upcomingMessage", message);
      }
    });

    socket.on("logout", async () => {

        const update = await userModel.findOneAndUpdate(
          { socketId: socket.id },
          { isActive: false, lastActive: Number(Date.now()), socketId: null }, {new: true} );
       
        if(update){
          const userId = update._id.toString()
          io?.emit("users", update);
        await pubClient.hDel("idToSocketId", userId);
        await getFriendsConnectionById(userId);
        socket.disconnect();
        }
      })

        socket.on("disconnect", async () => {

          const update = await userModel.findOneAndUpdate(
            { socketId: socket.id },
            { isActive: false, lastActive: Number(Date.now()), socketId: null }, {new: true} );

          if(update){
            const userId = update._id.toString()
            io?.emit("users", update);
            await pubClient.hDel("idToSocketId", userId);
            await getFriendsConnectionById(userId);
            socket.disconnect();
          }
      });
    });

  


  server.listen(port, async () => {
    console.log(`Worker ${process.pid} is running on port ${port}`);
  });
}

export { io };
