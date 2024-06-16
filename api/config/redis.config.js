import 'dotenv/config';
import redis from 'redis';

const redisClient = redis.createClient({
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.on('connect', () => {
    console.log(`Connected to Redis at ${process.env.DEV_DB_HOST}:${process.env.REDIS_PORT}`);
});

export default redisClient;