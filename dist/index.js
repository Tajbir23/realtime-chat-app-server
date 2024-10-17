"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./router/routes"));
const cors_1 = __importDefault(require("cors"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const userSchema_1 = __importDefault(require("./models/userSchema"));
const getFriendsConnection_1 = __importDefault(require("./controllers/friends/getFriendsConnection"));
const node_cron_1 = __importDefault(require("node-cron"));
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_os_1 = __importDefault(require("node:os"));
const redis_1 = require("./config/redis");
const node_process_1 = require("node:process");
const numCPUs = node_os_1.default.cpus().length;
// const numCPUs = 2;
const port = process.env.PORT || 3000;
// Redis setup for shared state in a clustered environment
let io = null;
exports.io = io;
if (node_cluster_1.default.isMaster) {
    console.log(`Master process is running on PID: ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        node_cluster_1.default.fork();
    }
    node_cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting a new worker...`);
        node_cluster_1.default.fork();
    });
    node_cron_1.default.schedule('0 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Running cron job');
        const now = Date.now();
        const BATCH_SIZE = 100;
        yield userSchema_1.default.updateMany({ myDayEndAt: { $lt: now }, isActiveMyDay: true }, { $set: { isActiveMyDay: false, myDayId: null, myDay: null } }).limit(BATCH_SIZE);
    }));
}
else {
    const app = (0, express_1.default)();
    const server = (0, node_http_1.createServer)(app);
    // Initialize Socket.io with Redis adapter
    exports.io = io = new socket_io_1.Server(server, {
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
    app.use((0, cors_1.default)({
        origin: [
            "http://localhost:5173",
            "https://chat.tajbirideas.com",
            "https://realtime-chat-app-tajbir.web.app",
            "https://g4pnft81-5173.inc1.devtunnels.ms",
        ],
    }));
    app.use(express_1.default.json());
    (0, db_1.default)();
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let value = 1000000;
        while (value > 0) {
            value--;
        }
        console.log(`handling the request using ${node_process_1.pid}`);
        res.send("Hello, World!");
    }));
    app.use("/api", routes_1.default);
    // Socket.io connection with Redis-based connected users
    io.on("connection", (socket) => {
        socket.on("connected", (user) => __awaiter(void 0, void 0, void 0, function* () {
            const ip = socket.handshake.address;
            const userId = user === null || user === void 0 ? void 0 : user._id;
            console.log("Connect user ", socket.id, userId);
            const update = yield userSchema_1.default.findOneAndUpdate({ email: user === null || user === void 0 ? void 0 : user.email }, { $set: { isActive: true, socketId: socket.id } }, { new: true });
            if (userId) {
                yield redis_1.pubClient.hSet('idToSocketId', userId, socket.id);
            }
            // const updatedUser = await findOneUser(user?._id);
            yield (0, getFriendsConnection_1.default)(userId);
            io === null || io === void 0 ? void 0 : io.emit("users", update);
        }));
        socket.on("sendUpcomingMessage", (message) => __awaiter(void 0, void 0, void 0, function* () {
            const receiverId = message === null || message === void 0 ? void 0 : message.receiverId;
            console.log('receiverId', receiverId);
            // const connectedUsers = await pubClient.hGetAll("connectedUsers");
            const socketId = yield redis_1.pubClient.hGet('idToSocketId', receiverId);
            console.log('socketId', socketId);
            if (socketId) {
                io === null || io === void 0 ? void 0 : io.to(socketId).emit("upcomingMessage", message);
            }
        }));
        socket.on("logout", () => __awaiter(void 0, void 0, void 0, function* () {
            const update = yield userSchema_1.default.findOneAndUpdate({ socketId: socket.id }, { isActive: false, lastActive: Number(Date.now()), socketId: null }, { new: true });
            if (update) {
                const userId = update._id.toString();
                io === null || io === void 0 ? void 0 : io.emit("users", update);
                yield redis_1.pubClient.hDel("idToSocketId", userId);
                yield (0, getFriendsConnection_1.default)(userId);
                socket.disconnect();
            }
        }));
        socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
            const update = yield userSchema_1.default.findOneAndUpdate({ socketId: socket.id }, { isActive: false, lastActive: Number(Date.now()), socketId: null }, { new: true });
            console.log('disconnect', socket.id, update === null || update === void 0 ? void 0 : update.name);
            if (update) {
                const userId = update._id.toString();
                io === null || io === void 0 ? void 0 : io.emit("users", update);
                yield redis_1.pubClient.hDel("idToSocketId", userId);
                yield (0, getFriendsConnection_1.default)(userId);
                socket.disconnect();
            }
        }));
    });
    server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Worker ${process.pid} is running on port ${port}`);
    }));
}
