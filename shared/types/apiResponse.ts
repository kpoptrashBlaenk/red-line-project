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
  image: string
  name: LanguageRecord
  index: number
}

/**
 * Social links for the footer
 */
export type Social = {
  id: number
  logo: string
  link: string
}
