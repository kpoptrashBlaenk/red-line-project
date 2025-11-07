import { userSchema } from '@/utils/schemas'
import type z from 'zod'

export type UserSchema = z.output<typeof userSchema>
