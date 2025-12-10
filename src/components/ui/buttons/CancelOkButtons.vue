<template>
  <div class="flex justify-end pb-1 pe-2">
    <IonButton fill="clear" :color @click="onCancel">{{ translation('cancel') }}</IonButton>
    <IonButton fill="clear" :color @click="onOk">OK</IonButton>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { Color } from '@/types'
import translation from '@/utils/translation'
import { IonButton } from '@ionic/vue'

/* Props */
defineProps<{
  color: Color
  onCancel: () => void
  onOk: () => void
}>()
</script>
