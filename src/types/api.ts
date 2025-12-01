import z from 'zod'
import { FormField } from './form'

/**
 * Api handler item to setup form fields, form state, validation schema and submit callbacks
 */
export type ApiHandlerItem = {
  fields: FormField[]
  state: Partial<unknown>
  schema: z.ZodType<any>
  onSubmit: (state: any) => Promise<void>
}

export type User = {
  token: string
}
