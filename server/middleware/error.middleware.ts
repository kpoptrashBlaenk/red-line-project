import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { config } from '../config/config';

export class ErrorMiddleware {
  static notFound(req: Request, res: Response) {
    res.status(404).json({
      error: 'Not Found',
      message: `Resource ${req.originalUrl} not found`,
      statusCode: 404,
    });
  }

  static errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    // Log the error
    logger.error({
      message: err.message,
      stack: config.NODE_ENV === 'development' ? err.stack : undefined,
      context: 'ErrorHandler',
      requestId: req.requestId,
      path: req.path,
      method: req.method,
    });

    // Handle specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: err.message,
        statusCode: 400,
      });
    }

    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: err.message,
        statusCode: 401,
      });
    }

    if (err.name === 'ForbiddenError') {
      return res.status(403).json({
        error: 'Forbidden',
        message: err.message,
        statusCode: 403,
      });
    }

    // Default error response
    res.status(500).json({
      error: 'Internal Server Error',
      message: config.NODE_ENV === 'development' ? err.message : 'Something went wrong',
      statusCode: 500,
    });
  }

  static asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  static rateLimiter() {
    // This would be implemented with a proper rate limiting library in production
    return (req: Request, res: Response, next: NextFunction) => {
      // For now, just pass through
      next();
    };
  }

  static featureFlagMiddleware(featureName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const featureFlag = config[`FEATURE_${featureName}_ENABLED` as keyof typeof config];
      
      if (featureFlag === false) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'The requested resource is not available',
        });
      }
      
      next();
    };
  }
}