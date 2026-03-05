<template>
  <IonSkeletonText animated :class="[`text-${size}`, `w-${width}`]" />
</template>

<script setup lang="ts">
/* Imports */
import { IonSkeletonText } from '@ionic/vue'

/* Props */
defineProps<{
  width: number
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>()
</script>

<style lang="css" scoped>
ion-skeleton-text {
  --border-radius: 20px;
}
</style>
