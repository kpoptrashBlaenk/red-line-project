import { createLogger, format, transports, Logger } from 'winston';
import { config } from '../config/config';

// Custom log format
const logFormat = format.printf(({ level, message, timestamp, context, requestId, ...meta }) => {
  let logMessage = `${timestamp} [${level}]`;
  
  if (context) {
    logMessage += ` [${context}]`;
  }
  
  if (requestId) {
    logMessage += ` [request:${requestId}]`;
  }
  
  logMessage += ` ${message}`;
  
  if (Object.keys(meta).length > 0 && config.LOG_LEVEL === 'debug') {
    logMessage += ` ${JSON.stringify(meta)}`;
  }
  
  return logMessage;
});

// Create logger instance
export const logger: Logger = createLogger({
  level: config.LOG_LEVEL,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    config.LOG_FORMAT === 'json' 
      ? format.json()
      : format.combine(
          format.colorize(),
          logFormat
        )
  ),
  transports: [
    new transports.Console(),
    // In production, you might want to add file transports
    ...(config.NODE_ENV === 'production' ? [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' })
    ] : [])
  ],
  exitOnError: false,
});

// Request-specific logger with context
export function createRequestLogger(context: string, requestId: string): Logger {
  return logger.child({
    context: context,
    requestId: requestId,
  });
}

// Error handling middleware
export function errorHandler(err: Error, context: string = 'Application'): void {
  logger.error({
    message: err.message,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
    context: context,
  });
}

// Express request logger middleware
export function requestLogger() {
  return (req: any, res: any, next: any) => {
    const start = Date.now();
    const requestId = req.headers['x-request-id'] || req.id || Math.random().toString(36).substring(2, 9);
    
    // Attach logger to request
    req.logger = createRequestLogger(req.path, requestId);
    req.requestId = requestId;
    
    // Log request start
    req.logger.info({
      message: 'Request started',
      method: req.method,
      path: req.path,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
    
    // Log request end
    res.on('finish', () => {
      const duration = Date.now() - start;
      req.logger.info({
        message: 'Request completed',
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      });
    });
    
    next();
  };
}

// Database query logger
export function logDatabaseQuery(query: string, params: any[] = [], context: string = 'Database') {
  if (config.LOG_LEVEL === 'debug') {
    logger.debug({
      message: 'Database query executed',
      query: query,
      params: params,
      context: context,
    });
  }
}

// Performance monitoring
export function logPerformance(operation: string, startTime: number, context: string = 'Performance') {
  const duration = Date.now() - startTime;
  logger.info({
    message: `Operation ${operation} completed`,
    duration: `${duration}ms`,
    context: context,
  });
}

// Health check logging
export function logHealthCheck() {
  logger.info({
    message: 'Health check performed',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
}

// Export types for TypeScript
export type { Logger } from 'winston';