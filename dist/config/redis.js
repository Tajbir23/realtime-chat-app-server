"use strict";
// import Redis from "ioredis";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const redis = new Redis({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
//     password: process.env.REDIS_PASSWORD,
// })
// export default redis;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default(process.env.REDIS_URL);
exports.default = redis;
