<template>
  <IonCardHeader :color="props.background">
    <IonCardTitle class="flex justify-center items-stretch">
      <div
        class="flex items-center text-2xl font-semibold py-4 px-7"
        :class="{
          'justify-start': !props.position || props.position === 'start',
          'justify-center': props.position === 'center',
          'justify-end': props.position === 'end',
          'h-32': props.img,
        }"
        :style="{ color: `var(--ion-color-${props.color})` }"
      >
        <IonIcon v-if="props.icon" :icon="props.icon" class="text-4xl me-2"></IonIcon>
        <div v-if="props.text">{{ props.text }}</div>
        <IonImg v-if="props.img" :src="props.img" class="h-full" />
      </div>
    </IonCardTitle>
  </IonCardHeader>
</template>

<script setup lang="ts">
/* Imports */
import { CardTitle } from '@/types'
import { IonCardHeader, IonCardTitle, IonIcon, IonImg } from '@ionic/vue'

/* Props */
defineProps<{
  props: CardTitle
}>()
</script>
