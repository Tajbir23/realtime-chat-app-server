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
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    }
});
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
(0, db_1.default)();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Hello, World!');
}));
app.use('/api', routes_1.default);
exports.io.on('connection', (socket) => {
    socket.on('connected', (email) => __awaiter(void 0, void 0, void 0, function* () {
        let user = yield userSchema_1.default.updateOne({ email: email }, { isActive: true, socketId: socket.id });
        console.log(user);
    }));
    socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('User disconnected', socket.id);
        yield userSchema_1.default.updateOne({ socketId: socket.id }, { isActive: false, socketId: socket.id });
    }));
});
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Server is running on port 3000');
}));
