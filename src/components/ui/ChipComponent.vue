<template>
  <IonChip :color class="px-2 text-xs pointer-events-none">
    {{ label }}
  </IonChip>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import { IonChip } from '@ionic/vue'

/* Props */
defineProps<{
  label: string
  color: Color
}>()
</script>
