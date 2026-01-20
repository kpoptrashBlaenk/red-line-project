<template>
  <IonMenu ref="menu" content-id="main-content" side="end">
    <!-- Header -->
    <IonHeader>
      <IonToolbar color="tertiary" class="px-5">
        <IonTitle> {{ translation('menu') }} </IonTitle>
      </IonToolbar>
    </IonHeader>

    <!-- List -->
    <IonContent color="">
      <IonList inset class="p-0! rounded-xl!">
        <!-- Non-Auth Items -->
        <template v-for="(page, key) in Object.values(pages).filter((page) => !page.auth)">
          <IonItem
            v-if="
              !(page.mobileOnly && isDesktop()) &&
              (page.auth === 'auth' ? userStore.user : page.auth === 'guest' ? !userStore.user : true)
            "
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

      <IonList inset class="p-0! rounded-xl!">
        <!-- Auth Items -->
        <template v-for="(page, key) in Object.values(pages).filter((page) => page.auth)">
          <IonItem
            v-if="
              !(page.mobileOnly && isDesktop()) &&
              (page.auth === 'auth' ? userStore.user : page.auth === 'guest' ? !userStore.user : true)
            "
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

        <!-- Again for logout -->
        <IonItem v-if="userStore.user" color="danger" button detail @click="handleLogout">
          <IonLabel class="text-xl! ms-2">{{ translation('logout') }}</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
</template>

<script setup lang="ts">
/* Imports */
import { useAuth } from '@/composables/auth'
import pages from '@/constants/pages'
import { useUserStore } from '@/stores/user'
import handleRoute from '@/utils/handleRoute'
import isDesktop from '@/utils/isDesktop'
import translation from '@/utils/translation'
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/* Constants */
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { logout } = useAuth()

/* Refs */
const menu = ref()

/* Functions */
function handleLogout() {
  logout()
  menu.value.$el.close()
  location.reload()
}
</script>
