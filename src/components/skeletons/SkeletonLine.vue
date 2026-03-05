<template>
  <IonSkeletonText animated :style="{ width: `${width * 4}px`, height: `${getFontSize(size)}px` }" />
</template>

<script setup lang="ts">
/* Imports */
import { IonSkeletonText } from '@ionic/vue'

/* Props */
defineProps<{
  width: number
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()

/* Functions */
function getFontSize(size: string) {
  switch (size) {
    case 'xs':
      return 16
    case 'sm':
      return 20
    case 'md':
      return 24
    case 'lg':
      return 28
    case 'xl':
      return 32
  }
}
</script>

<style lang="css" scoped>
ion-skeleton-text {
  --border-radius: 20px;
}
</style>
