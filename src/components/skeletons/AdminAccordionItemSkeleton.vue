<template>
  <IonItem>
    <div class="grid gap-3 items-center py-2 overflow-hidden h-16 grid-cols-[min-content_1fr]">
      <SkeletonImage :width="12" />
      <div class="overflow-hidden">
        <SkeletonLine :width="54" :size="'sm'" class="mb-1" />
        <SkeletonLine :width="32" :size="'xs'" />
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
