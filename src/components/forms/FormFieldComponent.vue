<template>
  <InputFieldComponent v-if="field.element === 'ion-input'" :field="field" :state="state" />
</template>

<script setup lang="ts">
/* Imports */
import type { FormField } from '@/types/form'
import InputFieldComponent from './InputFieldComponent.vue'

/* Props */
defineProps<{
  field: FormField
  state: Record<string, any>
}>()
</script>
