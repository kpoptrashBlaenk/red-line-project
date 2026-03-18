# Payment Gateway Integration - Backend Implementation

## Overview

This document describes the secure payment gateway integration (Stripe and PayPal) and the "Forgot Password" functionality implemented in the backend.

## Forgot Password Functionality (Already Implemented)

### Features

- **Complete REST API endpoints:**
  - `POST /api/auth/forgot-password` - Request password reset
  - `GET /api/auth/validate-reset-token` - Validate reset token
  - `POST /api/auth/reset-password` - Reset password

- **Security features:**
  - Secure token generation using `crypto.randomBytes()`
  - Token hashing with bcrypt
  - 1-hour token expiration
  - Generic error messages for security
  - Email validation

- **Database integration:**
  - `password_reset_tokens` table for token storage
  - Automatic token cleanup after password reset

- **Email service:**
  - Ready for production with nodemailer
  - Configurable SMTP settings via environment variables

### Usage

```bash
# Request password reset
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}

# Validate reset token
GET /api/auth/validate-reset-token?token=RESET_TOKEN

# Reset password
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "RESET_TOKEN",
  "newPassword": "newSecurePassword123!"
}
```

## Payment Gateway Integration (Newly Implemented)

### Stripe Integration

#### Features

- **Complete Stripe SDK integration**
- **Payment Intents API** for secure payments
- **Customer management**
- **Payment method attachment**
- **Webhook support** for real-time notifications
- **Production-ready implementation**

#### API Endpoints

```bash
# Create payment intent
POST /api/payment/stripe/create-payment-intent
Content-Type: application/json

{
  "amount": 10.50,
  "currency": "eur",
  "metadata": {
    "userId": "123",
    "orderId": "order_456"
  }
}

# Confirm payment
POST /api/payment/stripe/confirm-payment
Content-Type: application/json

{
  "paymentIntentId": "pi_123456789"
}

# Create customer
POST /api/payment/stripe/customers
Content-Type: application/json

{
  "email": "customer@example.com",
  "name": "John Doe",
  "metadata": {
    "userId": "123"
  }
}

# Attach payment method
POST /api/payment/stripe/attach-payment-method
Content-Type: application/json

{
  "customerId": "cus_123456789",
  "paymentMethodId": "pm_123456789"
}

# Webhook endpoint
POST /api/payment/stripe/webhook
Content-Type: application/json
Stripe-Signature: ...

{
  "type": "payment_intent.succeeded",
  "data": {...}
}
```

### PayPal Integration

#### Features

- **Complete PayPal REST API integration**
- **OAuth2 authentication**
- **Order creation and capture**
- **Sandbox environment support**
- **Production-ready implementation**

#### API Endpoints

```bash
# Create PayPal order
POST /api/payment/paypal/create-order
Content-Type: application/json

{
  "amount": 10.50,
  "currency": "EUR",
  "description": "Product purchase"
}

# Capture PayPal order
POST /api/payment/paypal/capture-order
Content-Type: application/json

{
  "orderId": "PAYPAL_ORDER_ID"
}
```

## Configuration

### Environment Variables

Add these to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_API_URL=https://api.sandbox.paypal.com  # Use https://api.paypal.com for production

# Security Configuration
BCRYPT_SALT_ROUNDS=10

# Application Configuration
FRONTEND_URL=https://your-frontend-url.com

# Email Configuration (for password reset)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
EMAIL_FROM=noreply@your-domain.com
```

## Dependencies

### Installed Packages

```bash
npm install stripe @types/stripe axios bcrypt @types/bcrypt
```

### Package Versions

- `stripe`: Latest stable version
- `@types/stripe`: TypeScript types for Stripe
- `axios`: For PayPal REST API calls
- `bcrypt`: For secure password hashing
- `@types/bcrypt`: TypeScript types for bcrypt

## Security Best Practices

### Implemented

1. **Environment variables** for all sensitive data
2. **Input validation** on all API endpoints
3. **Error handling** with generic messages
4. **HTTPS** required for all payment operations
5. **Token expiration** for password reset
6. **Secure hashing** with bcrypt
7. **Webhook signature verification** for Stripe

### Recommended

1. **Use HTTPS** in production
2. **Rotate API keys** regularly
3. **Monitor webhooks** for fraud detection
4. **Implement rate limiting** on public endpoints
5. **Use CSP headers** for frontend security
6. **Regular security audits**

## Testing

### Forgot Password

```bash
# Test password reset flow
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Validate token (replace TOKEN with actual token)
curl -X GET "http://localhost:3000/api/auth/validate-reset-token?token=TOKEN"

# Reset password
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token": "TOKEN", "newPassword": "newPassword123!"}'
```

### Stripe Payments

```bash
# Test payment intent creation
curl -X POST http://localhost:3000/api/payment/stripe/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 10.50, "currency": "eur"}'
```

### PayPal Payments

```bash
# Test PayPal order creation
curl -X POST http://localhost:3000/api/payment/paypal/create-order \
  -H "Content-Type: application/json" \
  -d '{"amount": 10.50, "currency": "EUR", "description": "Test product"}'
```

## Deployment Notes

### Stripe Webhooks

1. Configure Stripe webhook URL in Stripe Dashboard
2. Use the `STRIPE_WEBHOOK_SECRET` from your webhook configuration
3. Test webhooks using Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/payment/stripe/webhook
   ```

### PayPal

1. Use sandbox credentials for development
2. Switch to production credentials when deploying
3. Configure proper CORS headers for PayPal JS SDK

### Database

Ensure your database has the required tables:
- `users` table with password_hash column
- `password_reset_tokens` table for password reset functionality

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200 OK` - Success
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## Future Enhancements

1. **3D Secure authentication** for Stripe
2. **Recurring payments/subscriptions**
3. **Multi-currency support**
4. **Fraud detection integration**
5. **Detailed transaction logging**
6. **Admin dashboard for payments**

## Support

For issues with:
- **Stripe**: Check [Stripe Documentation](https://stripe.com/docs)
- **PayPal**: Check [PayPal Developer](https://developer.paypal.com/)
- **Password reset**: Check implementation in `auth.service.ts`

## License

This implementation is provided as-is and follows the main project license.
