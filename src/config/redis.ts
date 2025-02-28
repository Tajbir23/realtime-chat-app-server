// import Redis from "ioredis";

// const redis = new Redis({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
//     password: process.env.REDIS_PASSWORD,
// })

// export default redis;

import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL as string);

export default redis;
