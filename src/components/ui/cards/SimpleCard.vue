<template>
  <IonCard class="px-3 py-7 bg-light">
    <IonCardHeader>
      <IonCardTitle color="primary" class="ps-4 text-3xl font-semibold">
        <IonIcon :icon class="-mb-1.5" />
        {{ title }}
      </IonCardTitle>
    </IonCardHeader>

    <IonCardContent class="text-xl! mt-4 text-black">
      {{ content }}
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/vue'

/* Props */
defineProps<{
  title: string
  icon: string
  color: Color
  content: string
}>()
</script>
