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
const node_cron_1 = __importDefault(require("node-cron"));
const os_1 = __importDefault(require("os"));
const socketHandler_1 = __importDefault(require("./handler/socket/socketHandler"));
// import { pid } from "node:process";
const numCPUs = os_1.default.cpus().length;
console.log("processor core : ", numCPUs);
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            "http://192.168.1.10:5173",
            "http://localhost:5173",
            "http://localhost:4173",
            "https://chat.tajbirideas.com",
            "https://realtime-chat-app-tajbir.web.app",
            "https://g4pnft81-5173.inc1.devtunnels.ms",
            "https://realtime-chat-app-tajbir.web.app",
            "http://just-hotmail.gl.at.ply.gg:42993"
        ],
        // origin: "*",
    },
});
app.use((0, cors_1.default)({
    origin: [
        "http://192.168.1.10:5173",
        "http://localhost:5173",
        "http://localhost:4173",
        "https://chat.tajbirideas.com",
        "https://realtime-chat-app-tajbir.web.app",
        "https://g4pnft81-5173.inc1.devtunnels.ms",
        "https://realtime-chat-app-tajbir.web.app",
        "http://just-hotmail.gl.at.ply.gg:42993"
    ],
    // origin: "*",
}));
app.use(express_1.default.json());
(0, db_1.default)();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let value = 1000000
    // while (value > 0) {
    //   value--;
    // }
    // console.log(`handling the request using ${pid}`)
    res.send("Hello, World!");
}));
app.use("/api", routes_1.default);
// export const connectedUsers : ConnectedUserType = {};
(0, socketHandler_1.default)(exports.io);
// cron job for update my day
node_cron_1.default.schedule("0 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running cron job");
    const now = Date.now();
    const BATCH_SIZE = 100;
    yield userSchema_1.default
        .updateMany({ myDayEndAt: { $lt: now }, isActiveMyDay: true }, { $set: { isActiveMyDay: false, myDayId: null, myDay: null } })
        .limit(BATCH_SIZE);
}));
// export default server
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Server is running on port 3000");
}));
