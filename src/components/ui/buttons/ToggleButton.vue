<template>
  <IonButton color="primary" :fill="on ? 'solid' : 'outline'" @click="onToggle">{{ on ? onLabel : offLabel }}</IonButton>
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
  onByDefault?: boolean
}>()

/* Emits */
const emit = defineEmits(['update:on'])

/* Refs */
const on = ref<boolean>(props.onByDefault ?? false)

/* Functions */
function onToggle() {
  on.value ? (on.value = false) : (on.value = true)
  emit('update:on', on.value)
}
</script>

<style lang="css" scoped>
ion-button::part(native) {
  --border-width: 1px;
}
</style>
