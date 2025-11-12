<template>
  <IonCardHeader :color="props.background">
    <IonCardTitle>
      <div
        class="flex items-center text-2xl font-semibold py-4 px-7"
        :class="{
          'justify-start': !props.position || props.position === 'start',
          'justify-center': props.position === 'center',
          'justify-end': props.position === 'end',
        }"
        :style="{ color: `var(--ion-color-${props.color})` }"
      >
        <IonIcon v-if="props.icon" :icon="props.icon" class="text-4xl me-2"></IonIcon>
        <div>{{ props.text }}</div>
      </div>
    </IonCardTitle>
  </IonCardHeader>
</template>

<script setup lang="ts">
/* Imports */
import { CardTitle } from '@/types'
import { IonCardHeader, IonCardTitle, IonIcon } from '@ionic/vue'

/* Props */
defineProps<{
  props: CardTitle
}>()
</script>
