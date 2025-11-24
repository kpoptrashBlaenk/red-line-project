<template>
  <IonMenu content-id="main-content" side="end">
    <!-- Header -->
    <IonHeader>
      <IonToolbar color="primary" class="px-5">
        <IonTitle> {{ translation('menu') }} </IonTitle>
      </IonToolbar>
    </IonHeader>

    <!-- List -->
    <IonContent color="light">
      <IonList inset class="p-0! rounded-xl!">
        <!-- Item -->
        <template v-for="(page, key) in pages">
          <IonItem
            v-if="!(page.mobileOnly && getPlatforms().includes('desktop'))"
            :key
            :color="route.fullPath.startsWith(page.url) ? 'primary' : ''"
            :router-link="page.url"
            button
            detail
          >
            <IonLabel class="text-xl! ms-2">{{ translation(page.translationKey) }}</IonLabel>
          </IonItem>
        </template>
      </IonList>
    </IonContent>
  </IonMenu>
</template>

<script setup lang="ts">
/* Imports */
import pages from '@/constants/pages'
import translation from '@/utils/translation'
import { getPlatforms, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/vue'
import { useRoute } from 'vue-router'

/* Constants */
const route = useRoute()
</script>
