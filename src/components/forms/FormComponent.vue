<template>
  <form @submit.prevent="handleSubmit">
    <FormFieldComponent v-for="(field, index) in fields" :key="index" :field :state />
  </form>
</template>

<script setup lang="ts">
/* Imports */
import { FormField } from '@/types'
import { validateForm } from '@/utils/validateForm'
import z from 'zod'
import FormFieldComponent from './FormFieldComponent.vue'

/* Props */
interface Props<T extends Record<string, any>> {
  fields: FormField[]
  state: T
  schema: z.ZodType<T>
  onSubmit: (state: T) => void
}
const props = defineProps<Props<any>>()

/* Functions */
function handleSubmit() {
  if (!validateForm(props.fields, props.state, props.schema)) {
    return
  }

  props.onSubmit(props.state)
}
</script>
