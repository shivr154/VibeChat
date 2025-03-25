import { Redis } from "ioredis";
let redis: Redis;

redis = new Redis({
    host: process.env.REDIS_URL,
    port: 10226,
    password: process.env.REDIS_PASSWORD // Make sure this environment variable is set
  });


export default redis;
