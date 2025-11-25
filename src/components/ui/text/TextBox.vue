<template>
  <div class="flex items-center gap-5 bg-light p-5">
    <IonIcon :icon="informationCircleOutline" class="text-9xl" />
    {{ homeText }}
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { informationCircleOutline } from 'ionicons/icons'

/* Props */
defineProps<{
  homeText: string
}>()
</script>
