import { Response, NextFunction } from 'express';
import { redisClient } from '../index.js';
import { AuthenticatedRequest } from './auth.js';

interface RateLimiterOptions {
    windowMs: number;
    max: number;
    keyPrefix: string;
}

export const rateLimiter = (options: RateLimiterOptions) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            // Identify user: use user_id if authenticated, otherwise fallback to IP
            const identifier = req.user?.user_id || req.ip || req.socket.remoteAddress;
            const key = `rate-limit:${options.keyPrefix}:${identifier}`;

            // Increment the counter in Redis
            const current = await redisClient.incr(key);

            if (current === 1) {
                // If it's the first request in the window, set expiration
                await redisClient.expire(key, Math.floor(options.windowMs / 1000));
            }

            const remaining = Math.max(0, options.max - current);

            // Set rate limit headers
            res.setHeader('X-RateLimit-Limit', options.max);
            res.setHeader('X-RateLimit-Remaining', remaining);

            if (current > options.max) {
                return res.status(429).json({
                    message: "Too many requests, please try again later.",
                    error: "Rate limit exceeded"
                });
            }

            next();
        } catch (error) {
            console.error("Rate limiter error:", error);
            // In case of Redis failure, we might want to allow the request or block it.
            // Usually, allowing it is safer for user experience unless security is paramount.
            next();
        }
    };
};
