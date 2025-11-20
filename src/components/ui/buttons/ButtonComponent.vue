<template>
  <IonButton :color="props.color" :fill="props.fill">
    <IonIcon slot="end" :icon="props.icon" class="ms-1"></IonIcon>
    {{ props.label }}
  </IonButton>
</template>

<script setup lang="ts">
/* Imports */
import { ButtonProps } from '@/types'
import { IonButton, IonIcon } from '@ionic/vue'

/* Props */
defineProps<{
  props: ButtonProps
}>()
</script>
