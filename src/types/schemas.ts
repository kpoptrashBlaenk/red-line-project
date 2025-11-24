import { userSchema } from '@/utils/schemas'
import type z from 'zod'

/**
 * Schema for the user login body
 */
export type UserSchema = z.output<typeof userSchema>
