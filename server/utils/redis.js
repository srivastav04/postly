// utils/redis.js
import Redis from "ioredis";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redis = new Redis({ host: "redis", port: REDIS_PORT });
export default redis;
