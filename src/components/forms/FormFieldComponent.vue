<template>
  <DividerComponent v-if="field.element === 'divider'" :field class="col-span-2" />
  <InputFieldComponent v-else-if="field.element === 'ion-input'" :field :state :schema class="col-span-2 md:col-span-1" />
</template>

<script setup lang="ts">
/* Imports */
import type { FormField } from '@/types'
import z from 'zod'
import DividerComponent from './DividerComponent.vue'
import InputFieldComponent from './InputFieldComponent.vue'

/* Props */
defineProps<{
  field: FormField
  state: Record<string, any>
  schema: z.ZodType<any>
}>()
</script>
