export interface Promotion {
  id: number
  urlimage: string
  title_en: string
  title_fr: string
  subtitle_en: string
  subtitle_fr: string
  button_en: string
  button_fr: string
  description: string | null
  isactivate: boolean
  datecreate: Date
  dateupdate: Date
  link: string | null
  index: number
}

export interface PromotionInput {
  title_en: string
  title_fr: string
  subtitle_en: string
  subtitle_fr: string
  button_en: string
  button_fr: string
  urlimage: string
  link: string | null
  index?: number
}

export interface PromotionUpdate extends PromotionInput {
  isactivate: boolean
}

