<template>
  <IonThumbnail :style="{ width: width ? `${width * 4}px` : '' }">
    <IonSkeletonText animated />
  </IonThumbnail>
</template>

<script setup lang="ts">
/* Imports */
import { IonSkeletonText, IonThumbnail } from '@ionic/vue'

/* Props */
defineProps<{
  width?: number
}>()
</script>
