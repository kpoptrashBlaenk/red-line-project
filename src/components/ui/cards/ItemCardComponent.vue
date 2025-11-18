<template>
  <IonCard :color="props.color" class="hover:scale-105 transition-all">
    <CardHeaderComponent :props="props.header">
      <CardTitleComponent v-if="props.title" :props="props.title"> </CardTitleComponent>
    </CardHeaderComponent>

    <IonCardContent>
      <div class="px-7">
        <CardContentComponent v-if="props.content" :props="props.content" class="mt-5!" />

        <CardSubtitleComponent v-if="props.subtitle" :props="props.subtitle" class="text-2xl! mt-5!" />
      </div>

      <div class="flex justify-end">
        <ButtonComponent v-if="props.button" :props="props.button" class="mt-5" />
      </div>
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import { CardProps } from '@/types'
import { IonCard, IonCardContent } from '@ionic/vue'
import ButtonComponent from '../ui/ButtonComponent.vue'
import CardContentComponent from './CardContentComponent.vue'
import CardHeaderComponent from './CardHeaderComponent.vue'
import CardSubtitleComponent from './CardSubtitleComponent.vue'
import CardTitleComponent from './CardTitleComponent.vue'

/* Props */
defineProps<{
  props: CardProps
}>()
</script>

<style lang="css" scoped>
ion-card:hover {
  transition: all 0.3s;
  scale: 1.05;
  box-shadow:
    0 6px 2px -4px rgba(0, 0, 0, 0.4),
    0 4px 4px 0 rgba(0, 0, 0, 0.28),
    0 2px 10px 0 rgba(0, 0, 0, 0.24);
}

ion-card-content {
  color: var(--ion-text-color);
}
</style>
