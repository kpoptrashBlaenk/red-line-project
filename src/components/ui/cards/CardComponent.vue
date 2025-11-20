<template>
  <IonCard :color="props.color">
    <!-- Title -->
    <CardTitleComponent v-if="props.title" :props="props.title" />

    <IonCardContent>
      <div class="px-7 pb-7">
        <!-- Subtitle -->
        <CardSubtitleComponent v-if="props.subtitle" :props="props.subtitle" />

        <!-- Content -->
        <CardContentComponent v-if="props.content" :props="props.content" />

        <!-- List -->
        <CardListComponent v-if="props.list" :props="props.list" />
      </div>
    </IonCardContent>
  </IonCard>
</template>

<script setup lang="ts">
/* Imports */
import { CardProps } from '@/types'
import { IonCard, IonCardContent } from '@ionic/vue'
import CardContentComponent from './CardContentComponent.vue'
import CardListComponent from './CardListComponent.vue'
import CardSubtitleComponent from './CardSubtitleComponent.vue'
import CardTitleComponent from './CardTitleComponent.vue'

/* Props */
defineProps<{
  props: CardProps
}>()
</script>

<style lang="css" scoped>
ion-card-content {
  color: var(--ion-text-color);
}
</style>
