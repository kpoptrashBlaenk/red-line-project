import { LanguageRecord } from "$/types"

export interface PromotionRaw {
  id: number
  title_key: string
  subtitle_key: string
  button_key: string
  link: string
  image: string
}

export interface CreatePromotionInput {
  title: LanguageRecord
  subtitle: LanguageRecord
  button: LanguageRecord
  link: string
  image: string
}