<template>
  <IonInput
    v-model="state[field.name]"
    :label="field.label"
    :aria-label="field.label"
    label-placement="floating"
    clear-input
    fill="solid"
    :error-text="field.error"
    @ionInput="validate"
    @ionBlur="markTouched"
    :class="{ 'ion-touched': field.touched, 'ion-invalid': field.error }"
    mode="md"
  ></IonInput>
</template>

<script setup lang="ts">
/* Imports */
import type { FormField } from '@/types'
import { userSchema } from '@/utils/schemas'
import { IonInput } from '@ionic/vue'
import { toRef } from 'vue'

/* Props */
const props = defineProps<{
  field: FormField
  state: Record<string, any>
}>()

/* Refs */
const field = toRef(props, 'field')
const state = toRef(props, 'state')

/* Functions */
function validate() {
  const result = userSchema.safeParse(state.value)

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

<style lang="css" scoped>
ion-input {
  --background: transparent !important;
  --border-color: var(--ion-color-primary-tint) !important;
}

ion-input.ion-invalid {
  --border-color: var(--ion-color-danger) !important;
}
</style>
