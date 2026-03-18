import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export function authenticateApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];
  const expectedApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== expectedApiKey) {
    return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
  }

  next();
}

export function validatePaymentRequest(req: Request, res: Response, next: NextFunction) {
  const { amount, currency, method } = req.body;

  // Validate amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount - must be a positive number' });
  }

  // Validate currency
  if (currency && typeof currency !== 'string' && !['EUR', 'USD', 'GBP'].includes(currency.toUpperCase())) {
    return res.status(400).json({ error: 'Invalid currency - must be EUR, USD, or GBP' });
  }

  // Validate method
  const validMethods = ['stripe', 'paypal'];
  if (!method || !validMethods.includes(method.toLowerCase())) {
    return res.status(400).json({ error: 'Invalid payment method - must be stripe or paypal' });
  }

  next();
}

export function sanitizePaymentData(req: Request, res: Response, next: NextFunction) {
  // Sanitize amount to 2 decimal places
  if (req.body.amount) {
    req.body.amount = parseFloat(parseFloat(req.body.amount).toFixed(2));
  }

  // Sanitize currency to uppercase
  if (req.body.currency) {
    req.body.currency = req.body.currency.toUpperCase();
  }

  // Sanitize method to lowercase
  if (req.body.method) {
    req.body.method = req.body.method.toLowerCase();
  }

  next();
}

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  // In a real implementation, you would use a rate limiting library
  // like express-rate-limit and track requests by IP
  // This is a placeholder for the concept
  
  // Example: Allow 100 requests per 15 minutes per IP
  // const limiter = rateLimit({
  //   windowMs: 15 * 60 * 1000, // 15 minutes
  //   max: 100, // limit each IP to 100 requests per windowMs
  // });
  
  // For now, just pass through
  next();
}