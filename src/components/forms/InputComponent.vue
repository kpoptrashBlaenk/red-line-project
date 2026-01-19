<template>
  <IonInput
    :value="state[field.name]"
    :label="field.label"
    :aria-label="field.label"
    label-placement="floating"
    clear-input
    fill="solid"
    :type="field.type"
    :error-text="field.error"
    :clear-on-edit="false"
    @ionInput="onInput"
    @ionBlur="markTouched"
    :class="{ 'ion-touched': field.touched, 'ion-invalid': field.error }"
    mode="md"
  >
    <IonInputPasswordToggle v-if="field.type === 'password'" slot="end" class="-ms-17!" />
  </IonInput>
</template>

<script setup lang="ts">
/* Imports */
import type { InputField } from '@/types'
import { IonInput, IonInputPasswordToggle } from '@ionic/vue'
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

function onInput(event: CustomEvent) {
  const value = event.detail.value

  if (value && field.value.type === 'number') {
    state.value[field.value.name] = Number(value.replace(/[\d]/g, '')) ?? ''
  } else {
    state.value[field.value.name] = value
  }

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
