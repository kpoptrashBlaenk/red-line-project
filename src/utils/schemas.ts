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
  title_en: undefined,
  title_fr: undefined,
  subtitle_en: undefined,
  subtitle_fr: undefined,
  button_en: undefined,
  button_fr: undefined,
  link: undefined,
  image: undefined,
})
export type PromotionSchema = z.output<ReturnType<typeof promotionSchema>>

/* HomeText */
export const homeTextSchema = () =>
  z.object({
    text_en: z.string().min(1, translation('error_required')),
    text_fr: z.string().min(1, translation('error_required')),
  })
export const homeTextState = reactive<Partial<HomeTextSchema>>({
  text_en: undefined,
  text_fr: undefined,
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
  name_en: undefined,
  name_fr: undefined,
  image: undefined,
})
export type CategorySchema = z.output<ReturnType<typeof categorySchema>>

/* Product */
export const productSchema = () =>
  z.object({
    category_id: z.number(translation('error_required')).min(1, translation('error_required')),
    top: z.boolean(translation('error_required')),
    price: z.number(translation('error_required')),
    disponible: z.boolean(translation('error_required')),

    name_en: z.string().min(1, translation('error_required')),
    name_fr: z.string().min(1, translation('error_required')),

    description_functionality_en: z.string().min(1, translation('error_required')),
    description_functionality_fr: z.string().min(1, translation('error_required')),
    description_advantage_en: z.string().min(1, translation('error_required')),
    description_advantage_fr: z.string().min(1, translation('error_required')),
    description_security_en: z.string().min(1, translation('error_required')),
    description_security_fr: z.string().min(1, translation('error_required')),

    characteristics_performance_ids: z.array(z.number().min(1, translation('error_required'))),
    characteristics_scalability_ids: z.array(z.number().min(1, translation('error_required'))),
    characteristics_level_ids: z.array(z.number().min(1, translation('error_required'))),

    image: z.union([
      z.string().min(1, translation('error_required')),
      z.instanceof(File).refine(Boolean, translation('error_required')),
    ]),
  })
export const productState = reactive<Partial<ProductSchema>>({
  category_id: 0,
  top: false,
  price: 0,
  disponible: false,

  name_en: undefined,
  name_fr: undefined,

  description_functionality_en: undefined,
  description_functionality_fr: undefined,
  description_advantage_en: undefined,
  description_advantage_fr: undefined,
  description_security_en: undefined,
  description_security_fr: undefined,

  characteristics_performance_ids: [],
  characteristics_scalability_ids: [],
  characteristics_level_ids: [],

  image: undefined,
})
export type ProductSchema = z.output<ReturnType<typeof productSchema>>

/* Characteristics */
export const characteristicSchema = () =>
  z.object({
    name_en: z.string().min(1, translation('error_required')),
    name_fr: z.string().min(1, translation('error_required')),
    type: z.enum(['performance', 'scalability', 'level'], translation('error_required')),
  })
export const characteristicsState = reactive<Partial<CharacteristicSchema>>({
  name_en: undefined,
  name_fr: undefined,
  type: undefined,
})
export type CharacteristicSchema = z.output<ReturnType<typeof characteristicSchema>>
