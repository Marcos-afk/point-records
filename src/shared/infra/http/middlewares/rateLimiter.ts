import { AppError } from '@errors/AppError';
import { Response, Request, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import * as redis from 'redis';

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.NODE_ENV === 'test' ? 'localhost' : process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASSWORD,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: process.env.NODE_ENV === 'test' ? 10 : 3,
  duration: 5,
});

export const rateLimiter = async (request: Request, response: Response, next: NextFunction) => {
  try {
    await redisClient.connect();
    await limiter.consume(request.ip);
    return next();
  } catch {
    throw new AppError('Limite de requisições por segundo alcançado', 429);
  } finally {
    await redisClient.disconnect();
  }
};
