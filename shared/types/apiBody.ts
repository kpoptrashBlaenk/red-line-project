import { CategorySchema, CharacteristicSchema, HomeTextSchema, ProductSchema, PromotionSchema } from '@/utils/schemas'

type Id = { id: number }

/**
 * Body for promotion api
 */
export type PromotionBody = Omit<PromotionSchema, 'image'> & Id

/**
 * Body for home text api
 */
export type HomeTextBody = HomeTextSchema & Id

/**
 * Body for category api
 */
export type CategoryBody = Omit<CategorySchema, 'image'> & Id

/**
 * Body for product api
 */
export type ProductBody = Omit<ProductSchema, 'image'> & Id

/**
 * Body for characteristics api
 */
export type CharacteristicBody = CharacteristicSchema & Id
