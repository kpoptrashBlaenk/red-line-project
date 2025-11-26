<template>
  <IonCard class="active:scale-105 hover:scale-105 transition-all" :router-link="link">
    <IonImg :src="image" class="h-24 object-cover" />
    <IonCardHeader color="secondary" class="p-1">
      <IonCardTitle class="text-center">{{ title }}</IonCardTitle>
    </IonCardHeader>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import { IonCard, IonCardHeader, IonCardTitle, IonImg } from '@ionic/vue'

/* Props */
defineProps<{
  image: string
  link: string
  title: string
}>()
</script>
