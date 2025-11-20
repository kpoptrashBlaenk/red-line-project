<template>
  <IonMenu content-id="main-content" side="end">
    <IonHeader>
      <IonToolbar color="primary" class="px-5">
        <IonTitle> {{ translation('menu') }} </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent color="light">
      <IonList inset class="p-0! rounded-xl!">
        <IonItem
          v-for="(page, key) in pages"
          :key
          :color="route.fullPath.startsWith(page.url) ? 'primary' : ''"
          :router-link="page.url"
          button
          detail
        >
          <IonLabel class="text-xl! ms-2">{{ translation(page.translationKey) }}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
</template>

<script setup lang="ts">
/* Imports */
import pages from '@/constants/pages'
import translation from '@/utils/translation'
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/vue'
import { useRoute } from 'vue-router'

/* Constants */
const route = useRoute()
</script>
