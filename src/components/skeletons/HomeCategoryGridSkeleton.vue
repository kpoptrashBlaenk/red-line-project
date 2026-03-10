<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-3/4 mx-auto sm:w-full">
    <IonCard v-for="(i, key) in [0, 1, 2]" :key class="active:scale-105 hover:scale-105 transition-all cursor-pointer h-min">
      <SkeletonImage class="h-32 w-full" />
      <IonCardHeader :color="color" class="p-1">
        <SkeletonLine :width="48" size="lg" class="mx-auto my-1" />
      </IonCardHeader>
    </IonCard>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import { IonCard, IonCardHeader } from '@ionic/vue'
import SkeletonImage from './SkeletonImage.vue'
import SkeletonLine from './SkeletonLine.vue'

/* Props */
defineProps<{
  color: Color
}>()
</script>

<style lang="css" scoped>
ion-skeleton-text {
  --background: var(--ion-color-primary-contrast);
  --background-rgb: var(--ion-color-primary-contrast-rgb);
}
</style>
