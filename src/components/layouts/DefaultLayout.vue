<template>
  <IonMenu content-id="main-content" side="end">
    <IonHeader>
      <IonToolbar color="primary" class="px-5">
        <IonTitle> Menu </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent color="light">
      <IonList inset class="p-0! rounded-xl!">
        <IonItem :color="route.fullPath.startsWith('/home') ? 'primary' : ''" router-link="/home" button detail>
          <IonIcon slot="start" :icon="homeOutline" size="large" />
          <IonLabel class="text-2xl! ms-2">Home</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>

  <IonHeader mode="ios">
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

  <IonContent id="main-content" fullscreen>
    <slot></slot>

    <IonModal trigger="open-search-modal" :initial-breakpoint="0.75" :breakpoints="[0, 0.75]">
      <IonContent>
        <IonSearchbar placeholder="Search for products..." />
        <IonList>
          <IonItem router-link="/" button detail>
            <!-- Product Info -->
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  </IonContent>
</template>

<script setup lang="ts">
/* Imports */
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
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { cartOutline, homeOutline, searchOutline } from 'ionicons/icons'
import { useRoute } from 'vue-router'

/* Constants */
const route = useRoute()
</script>
