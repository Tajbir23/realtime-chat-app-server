import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import connection from "./config/db";
import router from "./router/routes";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import userModel from "./models/userSchema";
import cron from "node-cron";
import os from "os";
import setUpSocketHandler from "./handler/socket/socketHandler";
import ConnectedUserType from "./interface/connectedUserType";
// import { pid } from "node:process";

const numCPUs = os.cpus().length;
console.log("processor core : ", numCPUs);
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
      "https://realtime-chat-app-tajbir.web.app"
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
      "https://realtime-chat-app-tajbir.web.app"
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

export const connectedUsers : ConnectedUserType = {};

setUpSocketHandler(io);

// cron job for update my day
cron.schedule("0 * * * *", async () => {
  console.log("Running cron job");
  const now = Date.now();
  const BATCH_SIZE = 100;
  await userModel
    .updateMany(
      { myDayEndAt: { $lt: now }, isActiveMyDay: true },
      { $set: { isActiveMyDay: false, myDayId: null, myDay: null } }
    )
    .limit(BATCH_SIZE);
});
// export default server
server.listen(port, async () => {
  console.log("Server is running on port 3000");
});
