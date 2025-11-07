import { UserSchema } from '@/types'
import { reactive } from 'vue'
import z from 'zod'

// User
export const userSchema = z.object({
  name: z.string('Please enter a name.').min(1, 'Please enter a name.'),
})
export const userState = reactive<Partial<UserSchema>>({
  name: '',
})
