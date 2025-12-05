import { CategorySchema, HomeTextSchema, ProductSchema, PromotionSchema } from '@/utils/schemas'

type Id = { id: number }
type CategoryId = { category_id: number }
type Index = { index: number }

/**
 * Body for promotion api
 */
export type PromotionBody = Omit<PromotionSchema, 'image'> & Id & Index

/**
 * Body for home text api
 */
export type HomeTextBody = Omit<HomeTextSchema, 'image'> & Id

/**
 * Body for category api
 */
export type CategoryBody = Omit<CategorySchema, 'image'> & Id & Index

/**
 * Body for product api
 */
export type ProductBody = Omit<ProductSchema, 'image'> & Id & CategoryId & Index
