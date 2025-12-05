<template>
  <IonMenu ref="menu" content-id="main-content" side="end">
    <!-- Header -->
    <IonHeader>
      <IonToolbar color="tertiary" class="px-5">
        <IonTitle> {{ translation('menu') }} </IonTitle>
      </IonToolbar>
    </IonHeader>

    <!-- List -->
    <IonContent color="light">
      <IonList inset class="p-0! rounded-xl!">
        <!-- Item -->
        <template v-for="(page, key) in pages">
          <IonItem
            v-if="!(page.mobileOnly && isDesktop())"
            :key
            :color="route.fullPath.startsWith(page.url) ? 'primary' : 'light'"
            :router-link="page.url"
            :router-direction="page.url === pages.home.url ? 'back' : 'forward'"
            button
            detail
            @click="handleRoute(page.url)"
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
import { getLastRoute } from '@/router'
import isDesktop from '@/utils/isDesktop'
import translation from '@/utils/translation'
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* Constants */
const route = useRoute()
const router = useRouter()

/* Refs */
const menu = ref()

/* Functions */
function handleRoute(url: string) {
  menu.value.$el.close()

  if (route.fullPath.startsWith('/home')) {
    router.push(url)
    return
  }

  if (url.startsWith('/home')) {
    getLastRoute()?.startsWith('/home') ? router.back() : router.push(url)
    return
  }

  router.replace(url)
}
</script>
