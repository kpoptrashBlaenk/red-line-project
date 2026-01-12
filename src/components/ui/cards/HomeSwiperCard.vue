<template>
  <IonCard class="w-full h-78 flex flex-col" :class="isDesktop() ? 'rounded-2xl' : 'rounded-none mb-0.5'">
    <div class="h-32">
      <img :src="promotion.image[0]" class="w-full! object-cover" />
    </div>

    <IonCardHeader class="px-3 pt-3 text-start">
      <IonCardTitle color="primary" class="text-2xl font-bold">{{ translation(promotion.title) }}</IonCardTitle>
      <IonCardSubtitle class="mb-2">{{ translation(promotion.subtitle) }}</IonCardSubtitle>
    </IonCardHeader>

    <div class="flex justify-end mt-auto">
      <OutlineButton :label="translation(promotion.button)" :link="promotion.link" chevron color="primary" />
    </div>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import { Promotion } from '$/types'
import isDesktop from '@/utils/isDesktop'
import translation from '@/utils/translation'
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue'
import OutlineButton from '../buttons/ClearButton.vue'

/* Props */
defineProps<{
  promotion: Promotion
}>()
</script>
