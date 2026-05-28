import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisUrl = process.env.REDIS_URL;

export const createRedisClient = () => {
    return createClient({
        url: redisUrl
    });
};

export const redisClient = createRedisClient();

redisClient.connect()
    .then(() => console.log("Redis connected successfully"))
    .catch((error) => console.error("Failed to connect Redis : ", error));
