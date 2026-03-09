<template>
  <IonAlert
    :header="translation('alert_header')"
    :message="translation('alert_message')"
    :buttons="[
      { text: translation('cancel'), role: 'cancel' },
      { text: translation('delete'), role: 'destructive', handler: onSubmit, cssClass: 'bg-danger' },
    ]"
  />
</template>

<script setup lang="ts">
/* Improts */
import translation from '@/utils/translation'
import { IonAlert } from '@ionic/vue'

/* Props */
defineProps<{
  onSubmit: (state?: any) => Promise<void>
}>()
</script>
