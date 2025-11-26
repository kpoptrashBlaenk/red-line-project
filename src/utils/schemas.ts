import { reactive } from 'vue'
import z from 'zod'

/* Promotion */
export const promotionSchema = z.object({
  title: z.string('Please enter a title').min(1, 'Please enter a title'),
})
export const promotionState = reactive<Partial<PromotionSchema>>({
  title: '',
})
export type PromotionSchema = z.output<typeof promotionSchema>

/* User */
export const userSchema = z.object({
  name: z.string('Please enter a name.').min(1, 'Please enter a name.'),
})
export const userState = reactive<Partial<UserSchema>>({
  name: '',
})
export type UserSchema = z.output<typeof userSchema>
