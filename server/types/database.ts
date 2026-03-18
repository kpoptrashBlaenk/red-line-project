import { CharacteristicType } from '$/types'

export type PromotionRaw = {
  id: number
  title_key: string
  subtitle_key: string
  button_key: string
  link: string
  image: string
  index: number
}

export type HomeTextRaw = {
  id: number
  text_key: string
}

export type CategoryRaw = {
  id: number
  name_key: string
  description_key: string
  image: string
  index: number
}

export type CharacteristicRaw = {
  id: number
  name_key: string
  type: CharacteristicType
}

export type ProductRaw = {
  id: number
  category_id: number
  created_at: string
  top: boolean
  priority: boolean
  price: number
  disponible: boolean
  index: number
  name_key: string
  description_functionality_key: string
  description_advantage_key: string
  description_security_key: string
}

export type ProductImageRaw = {
  id: number
  product_id: number
  image: string
}
