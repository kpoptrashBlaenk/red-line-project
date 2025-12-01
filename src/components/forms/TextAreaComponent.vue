<template>
  <IonTextarea
    v-model="state[field.name]"
    :label="field.label"
    :aria-label="field.label"
    label-placement="floating"
    clear-input
    auto-grow
    fill="solid"
    :error-text="field.error"
    @ionInput="validate"
    @ionBlur="markTouched"
    :class="{ 'ion-touched': field.touched, 'ion-invalid': field.error }"
    mode="md"
    class="ps-5!"
  ></IonTextarea>
</template>

<script setup lang="ts">
/* Imports */
import type { TextareaField } from '@/types'
import { IonTextarea } from '@ionic/vue'
import { toRef } from 'vue'
import z from 'zod'

/* Props */
const props = defineProps<{
  field: TextareaField
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
ion-textarea {
  --background: transparent !important;
  --border-color: var(--ion-color-primary-tint) !important;
  --highlight-color: var(--ion-color-primary-shade);
}

ion-textarea.ion-invalid {
  --border-color: var(--ion-color-danger) !important;
}
</style>
