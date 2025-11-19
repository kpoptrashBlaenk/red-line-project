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
</template>

<script setup lang="ts">
/* Imports */
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/vue'
import { homeOutline } from 'ionicons/icons'
import { useRoute } from 'vue-router'

/* Constants */
const route = useRoute()
</script>
