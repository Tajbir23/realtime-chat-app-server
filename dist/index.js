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
exports.connectedUsers = exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./router/routes"));
const cors_1 = __importDefault(require("cors"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const userSchema_1 = __importDefault(require("./models/userSchema"));
const getAllUsers_1 = __importDefault(require("./controllers/getAllUsers"));
const getFriendsConnection_1 = __importDefault(require("./controllers/friends/getFriendsConnection"));
// import cron from 'node-cron'
// import axios from 'axios'
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://chat.tajbirideas.com", "https://realtime-chat-app-tajbir.web.app"],
        // origin: "*",
    }
});
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://chat.tajbirideas.com", "https://realtime-chat-app-tajbir.web.app"],
    // origin: "*",
}));
app.use(express_1.default.json());
(0, db_1.default)();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Hello, World!');
}));
app.use('/api', routes_1.default);
exports.connectedUsers = new Map();
exports.io.on('connection', (socket) => {
    socket.on('connected', (email) => __awaiter(void 0, void 0, void 0, function* () {
        exports.connectedUsers.set(socket.id, email);
        const update = yield userSchema_1.default.updateOne({ email: email }, { $set: { isActive: true, socketId: socket.id } });
        console.log("connected", email);
        const updatedUser = yield (0, getAllUsers_1.default)(email);
        yield (0, getFriendsConnection_1.default)(email);
        exports.io.emit('users', updatedUser);
    }));
    socket.on('logout', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = exports.connectedUsers.get(socket.id);
        if (email) {
            const update = yield userSchema_1.default.updateOne({ email: email }, { isActive: false, lastActive: Number(Date.now()), socketId: null });
            const updatedUser = yield (0, getAllUsers_1.default)(email);
            exports.io.emit('users', updatedUser);
            exports.connectedUsers.delete(socket.id);
            yield (0, getFriendsConnection_1.default)(email);
            socket.disconnect();
        }
    }));
    socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = exports.connectedUsers.get(socket.id);
        if (email) {
            const update = yield userSchema_1.default.updateOne({ email: email }, { isActive: false, lastActive: Number(Date.now()), socketId: null });
            const allUsers = yield (0, getAllUsers_1.default)(email);
            console.log('disconnect', email);
            exports.io.emit('users', allUsers);
            yield (0, getFriendsConnection_1.default)(email);
            exports.connectedUsers.delete(socket.id);
        }
    }));
});
// export default server
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Server is running on port 3000');
}));
