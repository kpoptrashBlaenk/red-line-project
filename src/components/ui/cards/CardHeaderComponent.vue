<template>
  <IonCardHeader :color="props?.color">
    <slot></slot>
  </IonCardHeader>
</template>

<script setup lang="ts">
/* Imports */
import { CardHeader } from '@/types'
import { IonCardHeader } from '@ionic/vue'

/* Props */
defineProps<{
  props?: CardHeader
}>()
</script>
