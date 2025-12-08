import { AdminSectionKey } from '@/constants/adminPages'
import { Ref } from 'vue'
import z from 'zod'
import { FormField } from './form'

/**
 * Context Item to fill whenever a new api is created
 */
export type ContextItem = Record<
  AdminSectionKey,
  {
    title: string
    value: AdminSectionKey
    itemsRef: Ref<any, any[]>
    image?: (item: any) => string
    text?: (item: any) => string
    note?: (item: any) => string
    reorder?: boolean
    add?: boolean
    modify?: boolean
    remove?: boolean
    reorderCallback?: (items: any[]) => Promise<void>
    composable: {
      createFields?: (() => FormField[]) | (() => Promise<FormField[]>)
      flatten?: (item: any) => any
      get?: () => Promise<any[]>
      reorder?: (items: any[]) => Promise<void>
      create?: (state: any) => Promise<void>
      modify?: (id: number, state: any) => Promise<void>
      remove?: (id: number) => Promise<void>
    }
    defaultState: any
    schema: z.ZodType<any>
    ref: Ref<any, any>
  }
>

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
