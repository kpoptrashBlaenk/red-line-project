<template>
  <div class="ion-padding">
    <ion-button color="secondary" mode="md">
      <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
      Custom Cyna Button
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'
import { chevronForwardOutline } from 'ionicons/icons'
</script>
