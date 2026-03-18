import NodeCache from 'node-cache';
import { logger } from './logger';
import { config } from '../config/config';

// Create cache instance with sensible defaults
export const cache = new NodeCache({
  stdTTL: 300, // Default TTL: 5 minutes
  checkperiod: 600, // Check for expired items every 10 minutes
  useClones: false, // Don't clone objects (better performance)
});

// Cache keys enum
export enum CacheKeys {
  CATEGORIES = 'categories:all',
  CHARACTERISTICS = 'characteristics:all',
  PROMOTIONS = 'promotions:active',
  HOME_TEXT = 'home:text',
  USER_SESSION = (userId: string) => `user:session:${userId}`,
  API_RATE_LIMIT = (ip: string) => `rate_limit:${ip}`,
}

// Cache service class
export class CacheService {
  static get<T>(key: string): T | undefined {
    try {
      const value = cache.get<T>(key);
      if (value !== undefined) {
        logger.debug(`Cache hit for key: ${key}`);
      }
      return value;
    } catch (error) {
      logger.error(`Error getting from cache: ${error}`);
      return undefined;
    }
  }

  static set<T>(key: string, value: T, ttl: number = 300): boolean {
    try {
      const success = cache.set(key, value, ttl);
      if (success) {
        logger.debug(`Cache set for key: ${key} (TTL: ${ttl}s)`);
      }
      return success;
    } catch (error) {
      logger.error(`Error setting cache: ${error}`);
      return false;
    }
  }

  static delete(key: string): number {
    try {
      const count = cache.del(key);
      if (count > 0) {
        logger.debug(`Cache deleted for key: ${key}`);
      }
      return count;
    } catch (error) {
      logger.error(`Error deleting from cache: ${error}`);
      return 0;
    }
  }

  static clear(): void {
    try {
      cache.flushAll();
      logger.info('Cache cleared successfully');
    } catch (error) {
      logger.error(`Error clearing cache: ${error}`);
    }
  }

  static getStats(): any {
    return {
      keys: cache.keys(),
      stats: cache.getStats(),
    };
  }

  // Cache with fallback function
  static async getWithFallback<T>(
    key: string,
    fallbackFn: () => Promise<T>,
    ttl: number = 300
  ): Promise<T> {
    // Try to get from cache first
    const cachedValue = this.get<T>(key);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    // Cache miss - execute fallback function
    try {
      const value = await fallbackFn();
      
      // Only cache if we're not in test environment
      if (config.NODE_ENV !== 'test') {
        this.set(key, value, ttl);
      }
      
      return value;
    } catch (error) {
      logger.error(`Cache fallback failed for key ${key}: ${error}`);
      throw error;
    }
  }

  // Invalidate cache for specific entity
  static invalidateEntity(entity: string, id?: string): void {
    if (id) {
      this.delete(`${entity}:${id}`);
    } else {
      // Invalidate all cache keys starting with entity
      const keys = cache.keys();
      keys.forEach((key) => {
        if (key.startsWith(`${entity}:`)) {
          this.delete(key);
        }
      });
    }
  }

  // Cache middleware for Express
  static cacheMiddleware(ttl: number = 60) {
    return (req: any, res: any, next: any) => {
      const cacheKey = `route:${req.method}:${req.originalUrl}`;
      
      // Only cache GET requests
      if (req.method !== 'GET') {
        return next();
      }
      
      // Try to serve from cache
      const cachedResponse = this.get<any>(cacheKey);
      if (cachedResponse) {
        logger.debug(`Serving from cache: ${cacheKey}`);
        return res.status(200).json(cachedResponse);
      }
      
      // Override res.json to cache the response
      const originalJson = res.json;
      res.json = (body: any) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.set(cacheKey, body, ttl);
        }
        originalJson.call(res, body);
      };
      
      next();
    };
  }
}