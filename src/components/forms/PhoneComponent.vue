<template>
  <div class="grid grid-cols-[90px_1fr] items-start">
    <IonItem button lines="none" class="mt-2 border-primary" @click="isOpen = true">
      <div class="flex gap-2" v-if="selectedCode">
        <img :src="selectedCode.image" class="h-5 w-5" />
        <div>{{ selectedCode.prefix }}</div>
      </div>
      <div v-else class="text-center w-full">+XX</div>
    </IonItem>

    <IonInput
      :value="state[field.name]"
      :label="field.label"
      :aria-label="field.label"
      :label-placement="field.stacked ? 'stacked' : 'floating'"
      clear-input
      fill="solid"
      type="number"
      :pattern="'/\D/g'"
      :error-text="field.error"
      :clear-on-edit="false"
      @ionInput="onInput"
      @ionBlur="markTouched"
      :class="{ 'ion-touched': field.touched, 'ion-invalid': field.error }"
      mode="md"
    >
    </IonInput>

    <IonPopover :is-open @did-dismiss="isOpen = false">
      <IonContent>
        <IonSearchbar v-model="search" />
        <IonList>
          <IonItem v-for="(countryCode, key) in filteredCodes" :key button @click="onSelect(countryCode.prefix)">
            <div class="flex gap-2">
              <img :src="countryCode.image" class="h-5 w-5 items-center" />
              <div>{{ countryCode.prefix }}</div>
              <div>{{ translation(countryCode.name) }}</div>
            </div>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPopover>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import type { CountryCode, PhoneField } from '@/types'
import translation from '@/utils/translation'
import { IonContent, IonInput, IonItem, IonList, IonPopover, IonSearchbar } from '@ionic/vue'
import { computed, onMounted, ref, toRef } from 'vue'
import z from 'zod'

/* Types */

/* Props */
const props = defineProps<{
  field: PhoneField
  state: Record<string, any>
  schema: z.ZodType<any> | undefined
}>()

/* Refs */
const field = toRef(props, 'field')
const state = toRef(props, 'state')
const countryCodes = ref<CountryCode[]>([])
const isOpen = ref<boolean>(false)
const search = ref<string>('')

/* Computeds */
const selectedCode = computed(() => countryCodes.value.find((countryCode) => countryCode.prefix === state.value.prefix))
const filteredCodes = computed(() =>
  countryCodes.value.filter(
    (countryCode) =>
      translation(countryCode.name).toLowerCase().includes(search.value.toLowerCase()) ||
      countryCode.prefix.includes(search.value) ||
      countryCode.code.includes(search.value),
  ),
)

/* Lifecycle Hooks */
onMounted(async () => {
  countryCodes.value = await fetch('/country_codes.json').then((res) => res.json())
})

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
  state.value[field.value.name] = event.detail.value?.replace(/^0/, '')

  validate()
}

function onSelect(prefix: string) {
  isOpen.value = false

  state.value.prefix = prefix
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

ion-popover {
  --min-width: 80%;
}
</style>
