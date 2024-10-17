import {createClient} from "redis"
// import { io } from "..";
// import { createAdapter } from "socket.io-redis";

const REDIS_URL = 'redis://default:PM2cte7LOLOugAViqui8AHHHkCXz1z7c@redis-17096.c14.us-east-1-3.ec2.redns.redis-cloud.com:17096';
// const REDIS_URL = 'redis://default:FgxtHeVFUDbKvPacAJvpSpIZUBhsGPop@autorack.proxy.rlwy.net:51415';
// const REDIS_URL = 'redis://127.0.0.1:6379';

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
