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
    class="ps-5!"
  ></IonInput>
</template>

<script setup lang="ts">
/* Imports */
import type { InputField } from '@/types'
import { IonInput } from '@ionic/vue'
import { toRef } from 'vue'
import z from 'zod'

/* Props */
const props = defineProps<{
  field: InputField
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

<style lang="css" scoped>
ion-input {
  --background: transparent !important;
  --border-color: var(--ion-color-primary-tint) !important;
  --highlight-color: var(--ion-color-primary-shade);
}

ion-input.ion-invalid {
  --border-color: var(--ion-color-danger) !important;
}
</style>
