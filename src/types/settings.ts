import { LanguageRecord } from '$/types'

/**
 * Available app languages
 */
export type Language = 'en' | 'fr'

/**
 * Available sort options
 */
export type SortOption = 'default' | 'priceLH' | 'priceHL' | 'new' | 'old' | 'disponible'

/**
 * Country codes from country_codes.json
 */
export type CountryCode = {
  name: LanguageRecord
  code: string
  image: string
  prefix: string
}
