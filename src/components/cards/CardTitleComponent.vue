<template>
  <IonCardHeader :color="props.color">
    <IonCardTitle>
      <div class="flex items-center justify-center text-2xl font-semibold p-4">
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
