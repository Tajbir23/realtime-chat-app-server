import { createClient } from "redis";

// const REDIS_URL = 'redis://:5m1aX9UKDIfL9j296DsgIcI8eUAqUObA@redis-10369.c44.us-east-1-2.ec2.redns.redis-cloud.com:10369';
const REDIS_URL = 'redis://127.0.0.1:6379';

export const pubClient = createClient({
    url: REDIS_URL
});

export const subClient = pubClient.duplicate();

const connectClients = async () => {
    try {
        await pubClient.connect();
        await subClient.connect();
        console.log("Connected to Redis successfully!");
    } catch (error) {
        console.error("Error connecting to Redis:", error);
    }

    pubClient.on('error', (err) => console.error('Redis Pub Client Error:', err));
    subClient.on('error', (err) => console.error('Redis Sub Client Error:', err));
};

connectClients();
