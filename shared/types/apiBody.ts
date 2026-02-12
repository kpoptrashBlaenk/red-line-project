import {
  AddressSchema,
  CategorySchema,
  CharacteristicSchema,
  EmailSchema,
  HomeTextSchema,
  LoginSchema,
  NameSchema,
  PasswordSchema,
  PaymentMethodSchema,
  PhoneSchema,
  ProductSchema,
  PromotionSchema,
  RegisterSchema,
} from '@/utils/schemas'

type Id = { id?: number }
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

/**
 * Body for login api
 */
export type LoginBody = LoginSchema

/**
 * Body for verify password api
 */
export type VerifyPasswordBody = { password: string }

/**
 * Body for name api
 */
export type NameBody = NameSchema

/**
 * Body for phone api
 */
export type PhoneBody = PhoneSchema

/**
 * Body for email api
 */
export type EmailBody = EmailSchema

/**
 * Body for password api
 */
export type PasswordBody = PasswordSchema

/**
 * Body for address api
 */
export type AddressBody = AddressSchema & Id

/**
 * Body for payment method api
 */
export type paymentMethodBody = PaymentMethodSchema & Id
