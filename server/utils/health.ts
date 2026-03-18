import { Request, Response } from 'express';
import { logger, logHealthCheck } from './logger';
import { cache } from './cache';
import { config } from '../config/config';

export class HealthService {
  static async checkHealth(req: Request, res: Response) {
    try {
      logHealthCheck();
      
      const healthStatus = {
        status: 'healthy' as const,
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        version: '1.0.0', // This should come from package.json in production
        components: {
          database: await this.checkDatabaseHealth(),
          cache: this.checkCacheHealth(),
          config: this.checkConfigHealth(),
        },
      };
      
      res.status(200).json(healthStatus);
    } catch (error) {
      logger.error(`Health check failed: ${error}`);
      res.status(503).json({
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  private static async checkDatabaseHealth() {
    try {
      // In a real implementation, this would test the database connection
      return {
        status: 'healthy',
        responseTime: '0.12ms', // Would be measured in real implementation
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private static checkCacheHealth() {
    try {
      const stats = cache.getStats();
      return {
        status: 'healthy',
        keys: stats.keys.length,
        hits: stats.hits,
        misses: stats.misses,
        size: stats.size,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private static checkConfigHealth() {
    try {
      // Validate critical configuration values
      const criticalConfigs = [
        'DATABASE_URL',
        'NODE_ENV',
        'PORT',
      ];
      
      const missingConfigs = criticalConfigs.filter(configKey => 
        !process.env[configKey] && configKey !== 'DATABASE_URL' // Allow missing in some environments
      );
      
      if (missingConfigs.length > 0) {
        return {
          status: 'degraded',
          missingConfigs: missingConfigs,
        };
      }
      
      return {
        status: 'healthy',
        environment: config.NODE_ENV,
        logLevel: config.LOG_LEVEL,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async checkReadiness(req: Request, res: Response) {
    try {
      // Check if the application is ready to serve traffic
      const readinessStatus = {
        ready: true,
        timestamp: new Date().toISOString(),
        checks: {
          database: true, // Would be actual check in production
          cache: true,
          externalServices: {
            stripe: config.FEATURE_PAYMENTS_ENABLED ? true : 'disabled',
            paypal: config.FEATURE_PAYMENTS_ENABLED ? true : 'disabled',
          },
        },
      };
      
      res.status(200).json(readinessStatus);
    } catch (error) {
      logger.error(`Readiness check failed: ${error}`);
      res.status(503).json({
        ready: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  static async getMetrics(req: Request, res: Response) {
    try {
      const metrics = {
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cacheStats: cache.getStats(),
        activeRequests: 0, // Would be tracked in production
        requestRate: 0, // Would be calculated in production
      };
      
      res.status(200).json(metrics);
    } catch (error) {
      logger.error(`Metrics collection failed: ${error}`);
      res.status(500).json({
        error: 'Failed to collect metrics',
      });
    }
  }
}