import dotenv from "dotenv";
dotenv.config();
import {createClient} from "redis"
// import { io } from "..";
// import { createAdapter } from "socket.io-redis";

const REDIS_URL = process.env.redis_url;

export const pubClient = createClient({
    url: REDIS_URL
});

export const subClient = pubClient.duplicate();

const connectClients = async () => {
    try {
        await pubClient.connect();
        await subClient.connect();
        // io?.adapter(createAdapter({pubClient, subClient}));
        console.log("Connected to Redis successfully!");
    } catch (error) {
        console.error("Error connecting to Redis:", error);
    }

    pubClient.on('error', (err) => console.error('Redis Pub Client Error:', err));
    subClient.on('error', (err) => console.error('Redis Sub Client Error:', err));
};

connectClients();
