import { pool } from '../app';
import { logger } from '../utils/logger';
import { CacheService, CacheKeys } from '../utils/cache';
import { ApiError, NotFoundError, ValidationError } from '../types';

export abstract class BaseService {
  protected cacheTTL: number;

  constructor(cacheTTL: number = 300) {
    this.cacheTTL = cacheTTL;
  }

  // Database query with caching
  protected async queryWithCache<T>(
    query: string,
    params: any[] = [],
    cacheKey: string,
    ttl?: number
  ): Promise<T[]> {
    try {
      return await CacheService.getWithFallback(
        cacheKey,
        async () => {
          const result = await pool.query<T>(query, params);
          return result.rows;
        },
        ttl || this.cacheTTL
      );
    } catch (error) {
      logger.error(`Database query failed: ${error}`);
      throw new ApiError(
        'Database operation failed',
        500,
        this.constructor.name,
        { query, params, error }
      );
    }
  }

  // Find by ID with caching
  protected async findById<T>(
    table: string,
    id: string,
    cacheKeyPrefix: string
  ): Promise<T> {
    const cacheKey = `${cacheKeyPrefix}:${id}`;
    
    const result = await this.queryWithCache<T>(
      `SELECT * FROM ${table} WHERE id = $1 LIMIT 1`,
      [id],
      cacheKey,
      this.cacheTTL
    );
    
    if (!result || result.length === 0) {
      throw new NotFoundError(table, id);
    }
    
    return result[0];
  }

  // Find all with caching
  protected async findAll<T>(
    query: string,
    params: any[] = [],
    cacheKey: string,
    ttl?: number
  ): Promise<T[]> {
    return this.queryWithCache<T>(query, params, cacheKey, ttl);
  }

  // Create entity
  protected async create<T>(
    table: string,
    data: Partial<T>,
    returning: string = '*'
  ): Promise<T> {
    try {
      const fields = Object.keys(data);
      const values = Object.values(data);
      const placeholders = fields.map((_, i) => `$${i + 1}`);
      
      const query = `
        INSERT INTO ${table} (${fields.join(', ')})
        VALUES (${placeholders.join(', ')})
        RETURNING ${returning}
      `;
      
      const result = await pool.query<T>(query, values);
      
      // Invalidate related cache
      this.invalidateCacheForEntity(table);
      
      return result.rows[0];
    } catch (error) {
      logger.error(`Create operation failed: ${error}`);
      throw new ApiError(
        'Failed to create entity',
        500,
        this.constructor.name,
        { table, data, error }
      );
    }
  }

  // Update entity
  protected async update<T>(
    table: string,
    id: string,
    data: Partial<T>,
    returning: string = '*'
  ): Promise<T> {
    try {
      const fields = Object.keys(data);
      const values = [...Object.values(data), id];
      const setClauses = fields.map((field, i) => `${field} = $${i + 1}`);
      
      const query = `
        UPDATE ${table}
        SET ${setClauses.join(', ')}, updated_at = NOW()
        WHERE id = $${fields.length + 1}
        RETURNING ${returning}
      `;
      
      const result = await pool.query<T>(query, values);
      
      if (result.rowCount === 0) {
        throw new NotFoundError(table, id);
      }
      
      // Invalidate cache for this entity
      this.invalidateCacheForEntity(table, id);
      
      return result.rows[0];
    } catch (error) {
      logger.error(`Update operation failed: ${error}`);
      throw new ApiError(
        'Failed to update entity',
        500,
        this.constructor.name,
        { table, id, data, error }
      );
    }
  }

  // Delete entity
  protected async delete(table: string, id: string): Promise<boolean> {
    try {
      const query = 'DELETE FROM ' + table + ' WHERE id = $1';
      const result = await pool.query(query, [id]);
      
      if (result.rowCount === 0) {
        throw new NotFoundError(table, id);
      }
      
      // Invalidate cache for this entity
      this.invalidateCacheForEntity(table, id);
      
      return true;
    } catch (error) {
      logger.error(`Delete operation failed: ${error}`);
      throw new ApiError(
        'Failed to delete entity',
        500,
        this.constructor.name,
        { table, id, error }
      );
    }
  }

  // Validate entity data
  protected validateData(data: any, schema: any): void {
    // This would use a validation library like Zod or Joi in production
    if (!data || Object.keys(data).length === 0) {
      throw new ValidationError('No data provided', {});
    }
  }

  // Invalidate cache for entity
  protected invalidateCacheForEntity(entity: string, id?: string): void {
    CacheService.invalidateEntity(entity, id);
  }

  // Log database query
  protected logQuery(query: string, params: any[] = []): void {
    if (process.env.NODE_ENV === 'development') {
      logger.debug({
        message: 'Database query executed',
        query: query,
        params: params,
        context: this.constructor.name,
      });
    }
  }

  // Performance monitoring
  protected async withPerformanceMonitoring<T>(
    operation: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - startTime;
      
      logger.debug({
        message: `${operation} completed`,
        duration: `${duration}ms`,
        context: this.constructor.name,
      });
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      logger.error({
        message: `${operation} failed`,
        duration: `${duration}ms`,
        error: error,
        context: this.constructor.name,
      });
      throw error;
    }
  }
}