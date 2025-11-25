<template>
  <IonHeader>
    <IonToolbar class="px-5" :color="isScrolled ? '' : 'tertiary'">
      <LogoComponent slot="start" :light="!isScrolled" />

      <IonButtons slot="end">
        <IonButton fill="clear" size="large" @click="$emit('open:search-modal')">
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

/* Props */
defineProps<{
  isScrolled: boolean
}>()
</script>

<style lang="css" scoped>
ion-toolbar::part(background) {
  transition: background-color 0.2s !important;
}
</style>
