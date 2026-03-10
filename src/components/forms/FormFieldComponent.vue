<template>
  <DividerComponent v-if="field.element === 'divider'" :field class="col-span-4" />
  <ImageComponent v-else-if="field.element === 'image'" :field :state :schema class="col-span-4" />
  <InputComponent v-else-if="field.element === 'input'" :field :state :schema class="col-span-4" />
  <PhoneComponent v-else-if="field.element === 'phone'" :field :state :schema class="col-span-4" />
  <TextAreaComponent v-else-if="field.element === 'textarea'" :field :state :schema class="col-span-4" />
  <ToggleComponent v-else-if="field.element === 'toggle'" :field :state :schema class="col-span-4" />
  <SelectComponent v-else-if="field.element === 'select'" :field :state :schema class="col-span-4" />
</template>

<script setup lang="ts">
/* Imports */
import type { FormField } from '@/types'
import { ZodType } from 'zod'
import DividerComponent from './DividerComponent.vue'
import ImageComponent from './ImageComponent.vue'
import InputComponent from './InputComponent.vue'
import PhoneComponent from './PhoneComponent.vue'
import SelectComponent from './SelectComponent.vue'
import TextAreaComponent from './TextAreaComponent.vue'
import ToggleComponent from './ToggleComponent.vue'

/* Props */
defineProps<{
  field: FormField
  state: Record<string, any>
  schema: ZodType<any> | undefined
}>()
</script>
