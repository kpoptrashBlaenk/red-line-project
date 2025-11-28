import { reactive } from 'vue'
import z from 'zod'
import translation from './translation'

/* Promotion */
export const promotionSchema = () =>
  z.object({
    title_en: z.string().min(1, translation('error_required')),
    title_fr: z.string().min(1, translation('error_required')),

    subtitle_en: z.string().min(1, translation('error_required')),
    subtitle_fr: z.string().min(1, translation('error_required')),

    button_en: z.string().min(1, translation('error_required')),
    button_fr: z.string().min(1, translation('error_required')),

    link: z.string().min(1, translation('error_required')),
    image: z.file(translation('error_required')),
  })
export const promotionState = reactive<Partial<PromotionSchema>>({
  title_en: '',
  title_fr: '',
  subtitle_en: '',
  subtitle_fr: '',
  button_en: '',
  button_fr: '',
  link: '',
  image: undefined,
})
export type PromotionSchema = z.output<ReturnType<typeof promotionSchema>>

/* Category */
export const categorySchema = () =>
  z.object({
    name_en: z.string().min(1, translation('error_required')),
    name_fr: z.string().min(1, translation('error_required')),

    image: z.file(translation('error_required')),
  })
export const categoryState = reactive<Partial<CategorySchema>>({
  name_en: '',
  name_fr: '',
  image: undefined,
})
export type CategorySchema = z.output<ReturnType<typeof categorySchema>>
