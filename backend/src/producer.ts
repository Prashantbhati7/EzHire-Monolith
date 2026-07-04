import { redisClient } from "./utils/redis.js";
import ApiError from "./utils/ApiError.js";


export const PublishToTopic = async (topic: string, message: any) => {
    try {
        const queueKey = `queue:${topic}`;
        const payload = JSON.stringify(message);
        await redisClient.lPush(queueKey, payload);
        console.log(`Successfully published message to Redis queue '${queueKey}'`);
    } catch (error) {
        console.error(`Failed to publish message to Redis queue '${topic}':`, error);
        throw new ApiError(500, "Failed to publish message to queue");
    }
};
