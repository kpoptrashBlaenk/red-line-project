<template>
  <IonItem lines="none" color="tertiary" class="mb-4 rounded-2xl">
    <div class="p-4 w-full">
      <div class="grid grid-cols-[100px_1fr_48px] gap-5 items-center border-b-2 border-white pb-4">
        <SkeletonImage :width="25" />
        <div>
          <SkeletonLine :width="32" size="xl" />
        </div>

        <SkeletonImage :width="12" />
      </div>

      <div class="border-b-2 border-white pb-4 pt-2">
        <div class="flex gap-2 items-center">
          <SkeletonLine :width="12" size="sm" />
          <SkeletonLine :width="16" size="xs" />
        </div>
        <SkeletonLine :width="48" size="xs" class="mt-1" />
      </div>

      <div class="pt-2">
        <SkeletonLine :width="32" size="xs" />
        <SkeletonLine :width="12" size="xs" class="mt-1" />
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
/* Imports */
import { IonItem } from '@ionic/vue'
import SkeletonImage from './SkeletonImage.vue'
import SkeletonLine from './SkeletonLine.vue'
</script>

<style lang="css" scoped>
ion-thumbnail {
  --background: var(--ion-color-secondary-contrast);
  --background-rgb: var(--ion-color-secondary-contrast-rgb);
}

ion-skeleton-text {
  --background: var(--ion-color-secondary-contrast);
  --background-rgb: var(--ion-color-secondary-contrast-rgb);
}
</style>
