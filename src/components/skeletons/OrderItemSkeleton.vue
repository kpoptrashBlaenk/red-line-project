<template>
  <IonItem class="mb-10 px-2">
    <div class="w-full bg-light py-2 rounded-xl">
      <div class="flex justify-between items-center border-primary border-b ps-4">
        <SkeletonLine :width="20" size="xs" class="mb-1" />
      </div>

      <div class="ps-4 py-2">
        <div>
          <div class="flex justify-between items-center me-5">
            <SkeletonLine :width="32" size="xl" />
            <SkeletonLine :width="20" size="xs" class="px-1" />
          </div>
          <SkeletonLine :width="32" size="md" class="mt-1" />
        </div>

        <div class="flex gap-2 items-center pt-1">
          <SkeletonLine :width="12" size="md" />
          <SkeletonLine :width="16" size="xs" class="mt-1" />
        </div>
      </div>

      <div class="flex gap-2 items-center border-primary border-t ps-4 pt-1">
        <SkeletonLine :width="12" size="md" />
        <SkeletonLine :width="16" size="xl" />
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
/* Imports */
import { IonItem } from '@ionic/vue'
import SkeletonLine from './SkeletonLine.vue'
</script>

<style lang="css" scoped>
ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}
</style>
