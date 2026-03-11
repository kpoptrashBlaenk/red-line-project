import {
  AddressSchema,
  CategorySchema,
  CharacteristicSchema,
  ContactSchema,
  EmailSchema,
  HomeTextSchema,
  LoginSchema,
  NameSchema,
  OrderSchema,
  PasswordSchema,
  PaymentMethodSchema,
  PhoneSchema,
  ProductSchema,
  PromotionSchema,
  RegisterSchema,
} from '@/utils/schemas'

type ImageString = { image: string[] }

/**
 * Body for promotion api
 */
export type PromotionBody = Omit<PromotionSchema, 'image'> & ImageString

/**
 * Body for home text api
 */
export type HomeTextBody = HomeTextSchema

/**
 * Body for category api
 */
export type CategoryBody = Omit<CategorySchema, 'image'> & ImageString

/**
 * Body for product api
 */
export type ProductBody = Omit<ProductSchema, 'image'> & ImageString

/**
 * Body for characteristics api
 */
export type CharacteristicBody = CharacteristicSchema

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
export type AddressBody = AddressSchema

/**
 * Body for payment method api
 */
export type PaymentMethodBody = PaymentMethodSchema

/**
 * Body for order api
 */
export type OrderBody = OrderSchema

/**
 * Body for contact api
 */
export type ContactBody = ContactSchema

/**
 * Body for dictionary api
 */
export type DictionaryBody = {
  key: string
  en: string
  fr: string
}
