import type { PredefinedColors } from '@ionic/core/dist/types/interface'
import { ZodType } from 'zod'
import { FormField } from './form'
import { Product, SubscriptionLength, SubscriptionUsers } from '$/types'

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
  schema: ZodType<any>
  onSubmit: (state?: any) => Promise<void>
}

/**
 * Group for account settings
 */
export type AccountGroup = {
  header: string
  items: AccountItem[]
}

/**
 * Piece of a draft
 */
export type DraftOrder = {
  product: Product
  length: SubscriptionLength
  users: SubscriptionUsers
  amount: number
}
