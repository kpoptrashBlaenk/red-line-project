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
  })
export const promotionState = reactive<Partial<PromotionSchema>>({
  title_en: '',
  title_fr: '',
  subtitle_en: '',
  subtitle_fr: '',
  button_en: '',
  button_fr: '',
  link: '',
})
export type PromotionSchema = z.output<typeof promotionSchema>
