import { rateLimitConfig } from '../../config/rateLimit.config.js';
import redisClient from '../../config/redis.config.js';

export const rateLimit = (configKey) => {
    const {limit, window} = rateLimitConfig[configKey]
  return async (req, res, next) => {
    const ip = req.ip;
    const currentRequests = await redisClient.incr(ip);

    if (currentRequests === 1) {
      await redisClient.expire(ip, window);
    }

    if (currentRequests > limit) {
      return res.status(429).send({message: 'Too many requests. Please try again later.'});
    }
    next();
  };
};
