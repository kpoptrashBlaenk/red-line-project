import { CategorySchema, CharacteristicSchema, HomeTextSchema, ProductSchema, PromotionSchema } from '@/utils/schemas'

type Id = { id: number }

/**
 * Body for promotion api
 */
export type PromotionBody = PromotionSchema & Id

/**
 * Body for home text api
 */
export type HomeTextBody = HomeTextSchema & Id

/**
 * Body for category api
 */
export type CategoryBody = CategorySchema & Id

/**
 * Body for product api
 */
export type ProductBody = ProductSchema & Id

/**
 * Body for characteristics api
 */
export type CharacteristicBody = CharacteristicSchema & Id
