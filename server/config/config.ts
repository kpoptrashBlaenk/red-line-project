import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Configuration Schema using Zod for runtime validation
export const ConfigSchema = z.object({
  // Server Configuration
  NODE_ENV: z.enum(['development', 'production', 'test', 'staging']).default('development'),
  PORT: z.coerce.number().default(3000),
  
  // Database Configuration
  DATABASE_URL: z.string().url(),
  DB_POOL_SIZE: z.coerce.number().default(10),
  DB_POOL_IDLE_TIMEOUT: z.coerce.number().default(30000),
  DB_POOL_CONNECT_TIMEOUT: z.coerce.number().default(5000),
  
  // Security Configuration
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10),
  JWT_SECRET: z.string().min(32).optional(),
  JWT_EXPIRES_IN: z.string().default('1h'),
  PASSWORD_RESET_TOKEN_EXPIRY: z.coerce.number().default(3600000), // 1 hour in ms
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  
  // CORS Configuration
  CORS_ORIGIN: z.string().optional(),
  CORS_METHODS: z.string().default('GET,POST,PUT,PATCH,DELETE'),
  CORS_CREDENTIALS: z.coerce.boolean().default(false),
  
  // File Uploads
  UPLOAD_LIMIT: z.string().default('10mb'),
  UPLOAD_DIR: z.string().default('uploads'),
  
  // Stripe Configuration
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  // PayPal Configuration
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  PAYPAL_API_URL: z.string().url().default('https://api.sandbox.paypal.com'),
  
  // Email Configuration
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_SECURE: z.coerce.boolean().default(false),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  
  // Application URLs
  FRONTEND_URL: z.string().url().optional(),
  API_BASE_URL: z.string().url().optional(),
  
  // Monitoring and Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug', 'trace']).default('info'),
  LOG_FORMAT: z.enum(['json', 'text']).default('json'),
  
  // Feature Flags
  FEATURE_PAYMENTS_ENABLED: z.coerce.boolean().default(true),
  FEATURE_AUTH_ENABLED: z.coerce.boolean().default(true),
  FEATURE_UPLOADS_ENABLED: z.coerce.boolean().default(true),
});

export type Config = z.infer<typeof ConfigSchema>;

// Load and validate configuration
export function loadConfig(): Config {
  try {
    const config = ConfigSchema.parse({
      ...process.env,
      // Provide default values for optional fields
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL,
      // Add other environment variables as needed
    });

    // Log configuration load (only in development)
    if (config.NODE_ENV === 'development') {
      console.log('✅ Configuration loaded successfully');
      console.log(`📋 Environment: ${config.NODE_ENV}`);
      console.log(`🚀 Port: ${config.PORT}`);
    }

    return config;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Configuration validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      console.error('❌ Failed to load configuration:', error);
    }
    process.exit(1);
  }
}

// Global configuration instance
export const config = loadConfig();

export default config;