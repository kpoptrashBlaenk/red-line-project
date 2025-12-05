<template>
  <IonToggle
    v-model="state[field.name]"
    :aria-label="field.label"
    label-placement="start"
    justify="start"
    clear-input
    fill="solid"
    :error-text="field.error"
    @ionChange="validate"
    @ionBlur="markTouched"
    :class="{ 'ion-touched': field.touched, 'ion-invalid': field.error }"
    mode="md"
    class="ms-9! mt-5 w-min"
    >{{ field.label }}</IonToggle
  >
</template>

<script setup lang="ts">
/* Imports */
import type { ToggleField } from '@/types'
import { IonToggle } from '@ionic/vue'
import { toRef } from 'vue'
import z from 'zod'

/* Props */
const props = defineProps<{
  field: ToggleField
  state: Record<string, any>
  schema: z.ZodType<any> | undefined
}>()

/* Refs */
const field = toRef(props, 'field')
const state = toRef(props, 'state')

/* Functions */
function validate() {
  const result = props.schema!.safeParse(state.value)

  if (!result.success) {
    const issue = result.error.issues.find((issue) => issue.path[0] === field.value.name)
    field.value.error = issue ? issue.message : ''
  } else {
    field.value.error = ''
  }
}

function markTouched() {
  field.value.touched = true
  validate()
}
</script>
