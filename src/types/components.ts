import type { PredefinedColors } from '@ionic/core/dist/types/interface'
import z from 'zod'
import { FormField } from './form'

/**
 * Props type for unit testing
 */
export type Props<T> = { props: T }

/**
 * Ionic colors
 */
export type Color = PredefinedColors

/**
 * Item for account settings
 */
export type AccountItem = {
  label: string
  icon: any
  type: string
  fields: FormField[]
  state: any
  schema: z.ZodType<any>
  onSubmit: (state?: any) => Promise<void>
}

/**
 * Group for account settings
 */
export type AccountGroup = {
  header: string
  items: AccountItem[]
}
