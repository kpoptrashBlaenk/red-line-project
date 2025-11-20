<template>
  <IonButton fill="clear" color="secondary" :router-link="link">
    {{ label }}
    <IonIcon :icon="chevronForward" />
  </IonButton>
</template>

<script setup lang="ts">
/* Imports */
import { IonButton, IonIcon } from '@ionic/vue'
import { chevronForward } from 'ionicons/icons'

/* Props */
defineProps<{
  label: string
  link?: string
}>()
</script>

<style lang="css" scoped></style>
