import { Language } from '@/types'
import { SubscriptionLength, SubscriptionStatus, SubscriptionUsers } from './other'

/**
 * Text record with multiple languages
 */
export type LanguageRecord = Record<Language, string>

/**
 * Promotional item for the Home Carousel
 */
export type Promotion = {
  id: number
  image: string[]
  title: LanguageRecord
  subtitle: LanguageRecord
  button: LanguageRecord
  link: string
  index: number
}

/**
 * Home Text Box
 */
export type HomeText = {
  id: number
  text: LanguageRecord
}

/**
 * Product categories
 */
export type Category = {
  id: number
  image: string[]
  name: LanguageRecord
  description: LanguageRecord
  index: number
}

/**
 * Products
 */
export type Product = {
  id: number
  category_id: number
  created_at: string
  image: string[]
  name: LanguageRecord
  top: boolean
  priority: boolean
  price: number
  disponible: boolean
  index: number

  description_functionality: LanguageRecord
  description_advantage: LanguageRecord
  description_security: LanguageRecord

  characteristics_performance_ids: number[]
  characteristics_scalability_ids: number[]
  characteristics_level_ids: number[]
}

/**
 * Characteristics
 */
export type Characteristic = {
  id: number
  name: LanguageRecord
  type: 'performance' | 'scalability' | 'level'
}

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  prefix: string
  token: string
}

/**
 * Social links for the footer
 */
export type Social = {
  id: number
  logo: string
  link: string
}

/**
 * Password verification
 */
export type VerifyPassword = boolean

/**
 * Payment address
 */
export type Address = {
  id: number
  first_name: string
  last_name: string
  street_address: string
  extended_address: string
  locality: string // city
  region: string
  postal_code: number
  country_code: string
  phone: string
  prefix: string
}

/**
 * Payment method
 */
export type PaymentMethod = {
  id: number
  name: string
  last4: string
  expiration: string
}

/**
 * Product order
 */
export type Order = {
  id: number
  date: string
  user_id: number
  product_id: number
  address_id: number
  payment_method_id: number
  length: SubscriptionLength
  users: SubscriptionUsers
  amount: number
  price: number
  status: SubscriptionStatus
}
