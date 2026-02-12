import { useAuth } from '@/composables/auth'
import { reactive } from 'vue'
import z from 'zod'
import translation from './translation'

export const ERROR = {
  error_required: () => translation('error_required'),
  error_password_min: () => translation('error_password_min'),
  error_password_max: () => translation('error_password_max'),
  error_password_uppercase: () => translation('error_password_uppercase'),
  error_password_lowercase: () => translation('error_password_lowercase'),
  error_password_number: () => translation('error_password_number'),
  error_password_special: () => translation('error_password_special'),
  error_password_no_spaces: () => translation('error_password_no_spaces'),
  error_password_confirm: () => translation('error_password_confirm'),
  error_password_verify: () => translation('error_password_confirm'),
}

/* Promotion */
export const promotionSchema = () =>
  z.object({
    title_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    title_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),

    subtitle_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    subtitle_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),

    button_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    button_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),

    link: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    image: z.array(z.union([z.instanceof(File), z.url()])).length(1, ERROR.error_required()),
  })
export const promotionState = reactive<Partial<PromotionSchema>>({
  title_en: undefined,
  title_fr: undefined,
  subtitle_en: undefined,
  subtitle_fr: undefined,
  button_en: undefined,
  button_fr: undefined,
  link: undefined,
  image: [],
})
export type PromotionSchema = z.output<ReturnType<typeof promotionSchema>>

/* HomeText */
export const homeTextSchema = () =>
  z.object({
    text_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    text_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
  })
export const homeTextState = reactive<Partial<HomeTextSchema>>({
  text_en: undefined,
  text_fr: undefined,
})
export type HomeTextSchema = z.output<ReturnType<typeof homeTextSchema>>

/* Category */
export const categorySchema = () =>
  z.object({
    name_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    name_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),

    description_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    description_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),

    image: z.array(z.union([z.instanceof(File), z.url()])).length(1, ERROR.error_required()),
  })
export const categoryState = reactive<Partial<CategorySchema>>({
  name_en: undefined,
  name_fr: undefined,

  description_en: undefined,
  description_fr: undefined,
  image: [],
})
export type CategorySchema = z.output<ReturnType<typeof categorySchema>>

/* Product */
export const productSchema = () =>
  z.object({
    category_id: z.number(ERROR.error_required()),
    top: z.boolean(ERROR.error_required()),
    priority: z.boolean(ERROR.error_required()),
    price: z.coerce.number(ERROR.error_required()).min(1, ERROR.error_required()),
    disponible: z.boolean(ERROR.error_required()),

    name_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    name_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),

    description_functionality_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    description_functionality_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    description_advantage_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    description_advantage_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    description_security_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    description_security_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),

    characteristics_performance_ids: z.array(z.number().min(1, ERROR.error_required())),
    characteristics_scalability_ids: z.array(z.number().min(1, ERROR.error_required())),
    characteristics_level_ids: z.array(z.number().min(1, ERROR.error_required())),

    image: z.array(z.union([z.instanceof(File), z.url()])).min(1, ERROR.error_required()),
  })
export const productState = reactive<Partial<ProductSchema>>({
  category_id: undefined,
  top: false,
  priority: false,
  price: undefined,
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

  image: [],
})
export type ProductSchema = z.output<ReturnType<typeof productSchema>>

/* Characteristics */
export const characteristicSchema = () =>
  z.object({
    name_en: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    name_fr: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    type: z.enum(['performance', 'scalability', 'level'], ERROR.error_required()),
  })
export const characteristicsState = reactive<Partial<CharacteristicSchema>>({
  name_en: undefined,
  name_fr: undefined,
  type: undefined,
})
export type CharacteristicSchema = z.output<ReturnType<typeof characteristicSchema>>

/* Register */
export const registerSchema = () =>
  z
    .object({
      first_name: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
      last_name: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
      email: z.email(ERROR.error_required()),
      password: z
        .string(ERROR.error_required())
        .min(8, ERROR.error_password_min())
        .max(128, ERROR.error_password_max())
        .regex(/[A-Z]/, ERROR.error_password_uppercase())
        .regex(/[a-z]/, ERROR.error_password_lowercase())
        .regex(/[0-9]/, ERROR.error_password_number())
        .regex(/[!@#$%^&*(),.?":{}|<>]/, ERROR.error_password_special())
        .refine((val) => !/\s/.test(val), ERROR.error_password_no_spaces()),
      confirm_password: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
      phone: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
      prefix: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    })
    .superRefine(({ confirm_password, password }, ctx) => {
      if (confirm_password !== password) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR.error_password_confirm(),
          path: ['confirm_password'],
        })
      }
    })
export const registerState = reactive<Partial<RegisterSchema>>({
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  password: undefined,
  confirm_password: undefined,
  phone: undefined,
  prefix: undefined,
})
export type RegisterSchema = z.output<ReturnType<typeof registerSchema>>

/* Login */
export const loginSchema = () =>
  z.object({
    email: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    password: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
  })
export const loginState = reactive<Partial<LoginSchema>>({
  email: undefined,
  password: undefined,
})
export type LoginSchema = z.output<ReturnType<typeof loginSchema>>

/* Name */
export const nameSchema = () =>
  z.object({
    first_name: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    last_name: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
  })

export const nameState = reactive<Partial<NameSchema>>({
  first_name: undefined,
  last_name: undefined,
})
export type NameSchema = z.output<ReturnType<typeof nameSchema>>

/* Email */
export const emailSchema = () =>
  z
    .object({
      email: z.email(ERROR.error_required()),
      verify_password: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    })
    .superRefine(async ({ verify_password }, ctx) => {
      if (ctx.issues.length > 0 && ctx.issues.some((issue) => !issue.path?.includes('verify_password'))) return

      const { verifyPassword } = useAuth()
      const result = await verifyPassword(verify_password)

      if (!result) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR.error_password_verify(),
          path: ['verify_password'],
        })
      }
    })

export const emailState = reactive<Partial<EmailSchema>>({
  email: undefined,
  verify_password: undefined,
})
export type EmailSchema = z.output<ReturnType<typeof emailSchema>>

/* Phone */
export const phoneSchema = () =>
  z.object({
    phone: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    prefix: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
  })

export const phoneState = reactive<Partial<PhoneSchema>>({
  phone: undefined,
  prefix: undefined,
})
export type PhoneSchema = z.output<ReturnType<typeof phoneSchema>>

/* Password */
export const passwordSchema = () =>
  z
    .object({
      password: z
        .string(ERROR.error_required())
        .min(8, ERROR.error_password_min())
        .max(128, ERROR.error_password_max())
        .regex(/[A-Z]/, ERROR.error_password_uppercase())
        .regex(/[a-z]/, ERROR.error_password_lowercase())
        .regex(/[0-9]/, ERROR.error_password_number())
        .regex(/[!@#$%^&*(),.?":{}|<>]/, ERROR.error_password_special())
        .refine((val) => !/\s/.test(val), ERROR.error_password_no_spaces()),
      confirm_password: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
      verify_password: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    })
    .superRefine(async ({ password, confirm_password, verify_password }, ctx) => {
      if (confirm_password !== password) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR.error_password_confirm(),
          path: ['confirm_password'],
        })

        return
      }

      const { verifyPassword } = useAuth()
      const result = await verifyPassword(verify_password)

      if (!result) {
        ctx.addIssue({
          code: 'custom',
          message: ERROR.error_password_verify(),
          path: ['verify_password'],
        })
      }
    })

export const passwordState = reactive<Partial<PasswordSchema>>({
  password: undefined,
  confirm_password: undefined,
  verify_password: undefined,
})
export type PasswordSchema = z.output<ReturnType<typeof passwordSchema>>

/* Address */
export const addressSchema = () =>
  z.object({
    first_name: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    last_name: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    street_address: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    extended_address: z.string(ERROR.error_required()).optional(),
    locality: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
    postal_code: z.coerce.number(ERROR.error_required()).min(1, ERROR.error_required()),
    country_code: z.string(ERROR.error_required()).min(1, ERROR.error_required()),
  })

export const addressState = reactive<Partial<AddressSchema>>({
  first_name: undefined,
  last_name: undefined,
  street_address: undefined,
  extended_address: undefined,
  locality: undefined,
  postal_code: undefined,
  country_code: undefined,
})
export type AddressSchema = z.output<ReturnType<typeof addressSchema>>
