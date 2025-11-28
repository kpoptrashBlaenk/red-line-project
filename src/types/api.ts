import z from 'zod'
import { FormField } from './form'

/**
 * An object of ApiHandlerItems
 */
export type ApiHandlerItems = {
  [key: string]: ApiHandlerItem
}

/**
 * Api handler item to setup form fields, form state, validation schema and submit callbacks
 */
export type ApiHandlerItem = {
  fields: FormField[]
  state: Partial<unknown>
  schema: z.ZodType<any>
  onSubmit: (state: any) => void
}

export type User = {
  token: string
}
