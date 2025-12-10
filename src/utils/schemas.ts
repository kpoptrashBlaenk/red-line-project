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
    image: z.union([
      z.string().min(1, translation('error_required')),
      z.instanceof(File).refine(Boolean, translation('error_required')),
    ]),
  })
export const promotionState = reactive<Partial<PromotionSchema>>({
  title_en: '',
  title_fr: '',
  subtitle_en: '',
  subtitle_fr: '',
  button_en: '',
  button_fr: '',
  link: '',
  image: '',
})
export type PromotionSchema = z.output<ReturnType<typeof promotionSchema>>

/* HomeText */
export const homeTextSchema = () =>
  z.object({
    text_en: z.string().min(1, translation('error_required')),
    text_fr: z.string().min(1, translation('error_required')),
  })
export const homeTextState = reactive<Partial<HomeTextSchema>>({
  text_en: '',
  text_fr: '',
})
export type HomeTextSchema = z.output<ReturnType<typeof homeTextSchema>>

/* Category */
export const categorySchema = () =>
  z.object({
    name_en: z.string().min(1, translation('error_required')),
    name_fr: z.string().min(1, translation('error_required')),

    image: z.union([
      z.string().min(1, translation('error_required')),
      z.instanceof(File).refine(Boolean, translation('error_required')),
    ]),
  })
export const categoryState = reactive<Partial<CategorySchema>>({
  name_en: '',
  name_fr: '',
  image: '',
})
export type CategorySchema = z.output<ReturnType<typeof categorySchema>>

export const productShema = () =>
  z.object({
    image: z.union([
      z.string().min(1, translation('error_required')),
      z.instanceof(File).refine(Boolean, translation('error_required')),
    ]),
    name_en: z.string().min(1, translation('error_required')),
    name_fr: z.string().min(1, translation('error_required')),
    top: z.boolean(),
  })
export const productState = reactive<Partial<ProductShema>>({
  image: '',
  name_en: '',
  name_fr: '',
  top: false,
})
export type ProductShema = z.output<ReturnType<typeof productShema>>