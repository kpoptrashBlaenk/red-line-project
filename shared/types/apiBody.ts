import {
  CategorySchema,
  CharacteristicSchema,
  HomeTextSchema,
  ProductSchema,
  PromotionSchema,
  RegisterSchema,
} from '@/utils/schemas'

type Id = { id: number }
type ImageString = { image: string[] }

/**
 * Body for promotion api
 */
export type PromotionBody = Omit<PromotionSchema, 'image'> & Id & ImageString

/**
 * Body for home text api
 */
export type HomeTextBody = HomeTextSchema & Id

/**
 * Body for category api
 */
export type CategoryBody = Omit<CategorySchema, 'image'> & Id & ImageString

/**
 * Body for product api
 */
export type ProductBody = Omit<ProductSchema, 'image'> & Id & ImageString

/**
 * Body for characteristics api
 */
export type CharacteristicBody = CharacteristicSchema & Id

/**
 * Body for register api
 */
export type RegisterBody = RegisterSchema
