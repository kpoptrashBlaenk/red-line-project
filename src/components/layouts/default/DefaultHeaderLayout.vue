<template>
  <IonHeader>
    <IonToolbar color="primary" class="px-5">
      <LogoComponent slot="start" />

      <IonButtons slot="end">
        <IonButton id="open-search-modal" fill="clear" size="large">
          <IonIcon :icon="searchOutline" />
        </IonButton>
        <IonButton fill="clear" size="large">
          <IonIcon :icon="cartOutline" />
        </IonButton>
        <IonMenuButton />
      </IonButtons>
    </IonToolbar>
  </IonHeader>
</template>

<script setup lang="ts">
/* Imports */
import LogoComponent from '@/components/ui/LogoComponent.vue'
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonToolbar } from '@ionic/vue'
import { cartOutline, searchOutline } from 'ionicons/icons'
</script>
