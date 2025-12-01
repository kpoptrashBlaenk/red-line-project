import { CategorySchema, HomeTextSchema, PromotionSchema } from '@/utils/schemas'

/**
 * Body for promotion api
 */
export type PromotionBody = Omit<PromotionSchema, 'image'>

/**
 * Body for home text api
 */
export type HomeTextBody = Omit<HomeTextSchema, 'image'>

/**
 * Body for category api
 */
export type CategoryBody = Omit<CategorySchema, 'image'>
