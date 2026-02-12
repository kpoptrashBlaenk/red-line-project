<template>
  <div>
    <div class="pt-5 ps-4 border-b border-primary" style="padding-bottom: 13px">
      <IonToggle
        v-model="state[field.name]"
        :aria-label="field.label"
        label-placement="start"
        justify="start"
        fill="solid"
        :error-text="field.error"
        @ionChange="validate"
        @ionBlur="markTouched"
        :class="{ 'ion-touched': field.touched, 'ion-invalid': field.error }"
        class="w-min"
      >
        {{ field.label }}
      </IonToggle>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import type { ToggleField } from '@/types'
import { IonToggle } from '@ionic/vue'
import { toRef } from 'vue'
import { ZodType } from 'zod'

/* Props */
const props = defineProps<{
  field: ToggleField
  state: Record<string, any>
  schema: ZodType<any> | undefined
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
</script>
