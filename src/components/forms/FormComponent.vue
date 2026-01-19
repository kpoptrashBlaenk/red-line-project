<template>
  <form @submit.prevent="handleSubmit" class="grid grid-cols-4 px-10 pb-5">
    <FormFieldComponent v-for="(field, key) in fields" :key :field :state :schema />
  </form>
</template>

<script setup lang="ts">
/* Imports */
import { FormField } from '@/types'
import { validateForm } from '@/utils/validateForm'
import z from 'zod'
import FormFieldComponent from './FormFieldComponent.vue'

/* Props */
const props = defineProps<{
  fields: FormField[]
  state: any
  schema: z.ZodType<any> | undefined
  onSubmit: (state: any) => Promise<void>
}>()

/* Functions */
async function handleSubmit() {
  console.log('hi')
  if (!validateForm(props.fields, props.state, props.schema)) {
    return
  }

  await props.onSubmit(props.state)
}
</script>
