// Main types index for better organization and maintainability

export * from './database';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
  timestamp?: string;
}

// Pagination Types
export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Common Entity Types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Error Types
export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public context?: string,
    public metadata?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Validation Error
export class ValidationError extends ApiError {
  constructor(message: string, public errors: Record<string, string>) {
    super(message, 400, 'ValidationError');
    this.name = 'ValidationError';
  }
}

// Authentication Error
export class AuthError extends ApiError {
  constructor(message: string) {
    super(message, 401, 'AuthenticationError');
    this.name = 'AuthError';
  }
}

// Authorization Error
export class AuthzError extends ApiError {
  constructor(message: string) {
    super(message, 403, 'AuthorizationError');
    this.name = 'AuthzError';
  }
}

// Not Found Error
export class NotFoundError extends ApiError {
  constructor(entity: string, id?: string) {
    const message = id 
      ? `${entity} with ID ${id} not found`
      : `${entity} not found`;
    super(message, 404, 'NotFoundError');
    this.name = 'NotFoundError';
  }
}

// Feature Flag Types
export interface FeatureFlags {
  paymentsEnabled: boolean;
  authEnabled: boolean;
  uploadsEnabled: boolean;
}

// Cache Types
export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  keyPrefix?: string;
}

// Event Types
export interface DomainEvent {
  eventId: string;
  eventType: string;
  timestamp: Date;
  payload: any;
  metadata?: Record<string, any>;
}

// Audit Log Types
export interface AuditLogEntry {
  id: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  oldValue?: any;
  newValue?: any;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

// Health Check Types
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  environment: string;
  version: string;
  components: {
    database: ComponentHealth;
    cache: ComponentHealth;
    config: ComponentHealth;
  };
}

interface ComponentHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  [key: string]: any;
}

// Metrics Types
export interface ApplicationMetrics {
  timestamp: string;
  uptime: number;
  memoryUsage: NodeJS.MemoryUsage;
  cacheStats: {
    keys: number;
    hits: number;
    misses: number;
  };
  activeRequests: number;
  requestRate: number;
}

// Utility Types
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type Nullable<T> = T | null;
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

// Request Context
export interface RequestContext {
  requestId: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  [key: string]: any;
}