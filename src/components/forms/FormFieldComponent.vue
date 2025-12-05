<template>
  <DividerComponent v-if="field.element === 'divider'" :field class="col-span-2" />
  <ImageComponent v-else-if="field.element === 'image'" :field :state :schema class="col-span-2 md:col-span-1" />
  <InputComponent v-else-if="field.element === 'input'" :field :state :schema class="col-span-2 md:col-span-1" />
  <TextAreaComponent v-else-if="field.element === 'textarea'" :field :state :schema class="col-span-2 md:col-span-1" />
  <ToggleComponent v-else-if="field.element === 'toggle'" :field :state :schema class="col-span-2 md:col-span-1" />
  <SelectComponent v-else-if="field.element === 'select'" :field :state :schema class="col-span-2 md:col-span-1" />
</template>

<script setup lang="ts">
/* Imports */
import type { FormField } from '@/types'
import z from 'zod'
import DividerComponent from './DividerComponent.vue'
import ImageComponent from './ImageComponent.vue'
import InputComponent from './InputComponent.vue'
import SelectComponent from './SelectComponent.vue'
import TextAreaComponent from './TextAreaComponent.vue'
import ToggleComponent from './ToggleComponent.vue'

/* Props */
defineProps<{
  field: FormField
  state: Record<string, any>
  schema: z.ZodType<any> | undefined
}>()
</script>
