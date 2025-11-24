<template>
  <IonCard class="mb-0.5 rounded-none w-full h-72 flex flex-col">
    <IonImg :src="promotion.image" class="bg-primary h-32 p-2" />

    <IonCardHeader class="p-5 text-start flex-1">
      <IonCardTitle>{{ promotion.title }}</IonCardTitle>
      <IonCardSubtitle class="mb-2">{{ promotion.subtitle }}</IonCardSubtitle>
    </IonCardHeader>

    <div class="flex justify-end pb-3 mt-auto">
      <OutlineButton :label="promotion.button" :link="promotion.link" color="primary" />
    </div>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/vue'
import OutlineButton from '../buttons/ClearButton.vue'

/* Props */
defineProps<{
  promotion: Promotion
}>()
</script>
