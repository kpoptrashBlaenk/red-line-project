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
            button
            detail
            :data-cy="`${key}-menu-item`"
            @click="handleRoute(route, router, page.url, () => menu.$el.close())"
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
import handleRoute from '@/utils/handleRoute'
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
</script>
