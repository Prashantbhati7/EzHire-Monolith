import { redisClient } from "./utils/redis.js";
import ApiError from "./utils/ApiError.js";

// No-op for Redis queue connection (as redisClient handles its own connection)
export const connectKafka = async () => {
    console.log("connectKafka called (noop for Redis queue)");
    return null;
};

// Publish message to Redis list queue
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

// No-op for Redis queue disconnection
export const disconnectKafka = async () => {
    console.log("disconnectKafka called (noop for Redis queue)");
};