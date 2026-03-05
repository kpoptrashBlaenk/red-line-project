<template>
  <IonThumbnail :class="`w-${width}`">
    <IonSkeletonText animated />
  </IonThumbnail>
</template>

<script setup lang="ts">
/* Imports */
import { IonSkeletonText, IonThumbnail } from '@ionic/vue'

/* Props */
defineProps<{
  width: number
}>()
</script>
