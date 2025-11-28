import { PromotionSchema } from '@/utils/schemas'

/**
 * Body for promotion api
 */
export type PromotionBody = Omit<PromotionSchema, 'image'>
