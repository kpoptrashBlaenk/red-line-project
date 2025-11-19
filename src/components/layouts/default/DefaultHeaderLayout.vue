<template>
  <IonHeader>
    <IonToolbar color="primary" class="px-5">
      <IonImg
        src="https://cyna-it.fr/wp-content/themes/theme-cyna-it/images/logo-cyna-white.svg"
        slot="start"
        router-link="/home"
      />

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
import { IonButton, IonButtons, IonHeader, IonIcon, IonImg, IonMenuButton, IonToolbar } from '@ionic/vue'
import { cartOutline, searchOutline } from 'ionicons/icons'
</script>
