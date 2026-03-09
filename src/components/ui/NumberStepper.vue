<template>
  <div class="flex items-center">
    <IonButton color="primary" @click="change('min')">
      <IonIcon slot="icon-only" :icon="removeOutline" />
    </IonButton>
    <div class="font-bold text-xl mx-5">{{ amount }}</div>
    <IonButton color="primary" @click="change('max')">
      <IonIcon slot="icon-only" :icon="addOutline" />
    </IonButton>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { IonButton, IonIcon } from '@ionic/vue'
import { addOutline, removeOutline } from 'ionicons/icons'

/* Props */
const props = defineProps<{
  amount: number
  min?: number
  max?: number
}>()

/* Emits */
const emit = defineEmits(['update:amount'])

/* Functions */
function change(context: 'min' | 'max') {
  let amount = props.amount

  if (context === 'min') {
    if (props.min === undefined || props.amount > props.min) {
      amount--
    }
  } else {
    if (props.max === undefined || props.amount < props.max) {
      amount++
    }
  }

  emit('update:amount', amount)
}
</script>
