<template>
  <!-- FAB -->
  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton @click="$emit('open:modal')">
      <IonIcon :icon="chatboxOutline" />
    </IonFabButton>
  </IonFab>
</template>

<script setup lang="ts">
/* Imports */
import { IonFab, IonFabButton, IonIcon } from '@ionic/vue'
import { chatboxOutline } from 'ionicons/icons'
</script>
