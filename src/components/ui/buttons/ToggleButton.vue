<template>
  <IonButton color="primary" :fill="on ? 'solid' : 'outline'" @click="onToggle" class="font-extrabold">{{
    on ? onLabel : offLabel
  }}</IonButton>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import { IonButton } from '@ionic/vue'
import { ref } from 'vue'

/* Props */
const props = defineProps<{
  onLabel: string
  offLabel: string
  color: Color
  default: boolean
  onUpdate: (value: boolean) => void
}>()

/* Refs */
const on = ref<boolean>(props.default)

/* Functions */
function onToggle() {
  on.value ? (on.value = false) : (on.value = true)
  props.onUpdate(on.value)
}
</script>

<style lang="css" scoped>
ion-button::part(native) {
  --border-width: 1px;
}
</style>
