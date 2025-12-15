<template>
  <IonSelect
    v-model="state[field.name]"
    :label="field.label"
    :aria-label="field.label"
    label-placement="floating"
    justify="start"
    fill="solid"
    :error-text="field.error"
    @ionChange="validate"
    @ionBlur="markTouched"
    :class="{ 'ion-touched': field.touched, 'ion-invalid': field.error }"
    class="ps-5!"
    :multiple="field.multiple"
  >
    <IonSelectOption v-for="(item, key) in field.items" :key :value="item[field.itemValueKey]">
      {{ translation(item[field.itemLabelKey]) }}
    </IonSelectOption>
  </IonSelect>
</template>

<script setup lang="ts">
/* Imports */
import type { SelectField } from '@/types'
import translation from '@/utils/translation'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { toRef } from 'vue'
import z from 'zod'

/* Props */
const props = defineProps<{
  field: SelectField
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
ion-select {
  --background: transparent !important;
  --border-color: var(--ion-color-primary-tint) !important;
  --highlight-color: var(--ion-color-primary-shade);
}

ion-select.ion-invalid {
  --border-color: var(--ion-color-danger) !important;
  --highlight-color: var(--ion-color-danger) !important;
}

ion-select.ion-invalid::part(label),
ion-select.ion-invalid::part(icon) {
  color: var(--ion-color-danger) !important;
}
</style>
