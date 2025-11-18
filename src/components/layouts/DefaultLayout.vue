<template>
  <IonMenu content-id="main-content" side="end">
    <IonHeader>
      <IonToolbar color="primary" class="px-5">
        <IonTitle> Menu </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent color="light">
      <IonList inset class="p-0! rounded-xl!">
        <IonItem :color="route.fullPath.startsWith('/home') ? 'primary' : ''" button detail router-link="/home">
          <IonIcon slot="start" :icon="homeOutline" size="large" />
          <IonLabel class="text-2xl! ms-2">Home</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>

  <IonHeader>
    <IonToolbar color="primary" class="px-5">
      <IonImg
        src="https://cyna-it.fr/wp-content/themes/theme-cyna-it/images/logo-cyna-white.svg"
        slot="start"
        router-link="/home"
      />

      <IonButtons slot="end">
        <IonButton fill="clear" size="large">
          <IonIcon :icon="searchOutline" />
        </IonButton>
        <IonButton fill="clear" size="large">
          <IonIcon :icon="cartOutline" />
        </IonButton>
        <IonMenuButton />
      </IonButtons>
    </IonToolbar>
  </IonHeader>

  <IonContent id="main-content" fullscreen>
    <slot></slot>
  </IonContent>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { cartOutline, homeOutline, searchOutline } from 'ionicons/icons'
import { useRoute } from 'vue-router'

/* Constants */
const route = useRoute()
</script>
