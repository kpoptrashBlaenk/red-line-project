<template>
  <IonInput
    :value="state[field.name]"
    :label="field.label"
    :aria-label="field.label"
    :label-placement="field.stacked ? 'stacked' : 'floating'"
    clear-input
    fill="solid"
    :type="field.type"
    :pattern="field.type === 'number' ? '/\D/g' : undefined"
    :error-text="field.error"
    :clear-on-edit="false"
    @ionInput="onInput"
    @ionBlur="markTouched"
    :class="{ 'ion-touched': field.touched, 'ion-invalid': field.error }"
    mode="md"
  >
    <IonInputPasswordToggle v-if="field.type === 'password'" slot="end" class="-ms-2!" />
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
async function validate() {
  const result = await props.schema!.safeParseAsync(state.value)

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
  state.value[field.value.name] = event.detail.value

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
