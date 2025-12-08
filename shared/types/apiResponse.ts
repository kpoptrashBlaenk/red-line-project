import { Language } from '@/types'

/**
 * Text record with multiple languages
 */
export type LanguageRecord = Record<Language, string>

/**
 * Promotional item for the Home Carousel
 */
export type Promotion = {
  id: number
  image: string // image url
  title: LanguageRecord
  subtitle: LanguageRecord
  button: LanguageRecord // button text
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
  image: string
  name: LanguageRecord
  index: number
}

/**
 * Products
 */
export type Product = {
  id: number
  category_id: number
  image: string
  name: LanguageRecord
  top: boolean
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

/**
 * Social links for the footer
 */
export type Social = {
  id: number
  logo: string
  link: string
}
