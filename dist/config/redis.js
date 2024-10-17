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
Object.defineProperty(exports, "__esModule", { value: true });
exports.subClient = exports.pubClient = void 0;
const redis_1 = require("redis");
// import { io } from "..";
// import { createAdapter } from "socket.io-redis";
const REDIS_URL = 'redis://default:PM2cte7LOLOugAViqui8AHHHkCXz1z7c@redis-17096.c14.us-east-1-3.ec2.redns.redis-cloud.com:17096';
// const REDIS_URL = 'redis://default:FgxtHeVFUDbKvPacAJvpSpIZUBhsGPop@autorack.proxy.rlwy.net:51415';
// const REDIS_URL = 'redis://127.0.0.1:6379';
exports.pubClient = (0, redis_1.createClient)({
    url: REDIS_URL
});
exports.subClient = exports.pubClient.duplicate();
const connectClients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.pubClient.connect();
        yield exports.subClient.connect();
        // io?.adapter(createAdapter({pubClient, subClient}));
        console.log("Connected to Redis successfully!");
    }
    catch (error) {
        console.error("Error connecting to Redis:", error);
    }
    exports.pubClient.on('error', (err) => console.error('Redis Pub Client Error:', err));
    exports.subClient.on('error', (err) => console.error('Redis Sub Client Error:', err));
});
connectClients();
