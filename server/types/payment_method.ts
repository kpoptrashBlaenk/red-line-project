export interface PaymentMethod {
  id: number
  user_id: number
  provider_id: number
  name: string
  last4: string
  expiration: string
}
