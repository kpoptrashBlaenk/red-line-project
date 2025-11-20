<template>
  <IonInput
    v-model="state[field.name]"
    :label="field.label"
    :error-text="field.error"
    @ionInput="validate"
    @ionBlur="markTouched"
    :class="{ 'ion-touched': field.touched, 'ion-invalid': field.error }"
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
