export enum PaymentMethod {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
}

export enum PaymentStatus {
  CREATED = 'created',
  REQUIRES_PAYMENT_METHOD = 'requires_payment_method',
  REQUIRES_CONFIRMATION = 'requires_confirmation',
  REQUIRES_ACTION = 'requires_action',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELED = 'canceled',
  APPROVED = 'approved',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
}

export interface PaymentRequest {
  method: PaymentMethod;
  amount: number;
  currency: string;
  metadata?: any;
}

export interface PaymentResponse {
  id: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  method: PaymentMethod;
  createdAt: Date;
  metadata?: any;
}

export interface RefundRequest {
  paymentId: string;
  amount?: number;
  reason?: string;
}

export interface RefundResponse {
  id: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  reason?: string;
}