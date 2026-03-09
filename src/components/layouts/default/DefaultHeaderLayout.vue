<template>
  <IonHeader>
    <IonToolbar class="px-5" :color="isScrolled ? '' : 'tertiary'">
      <LogoComponent slot="start" :light="!isScrolled" />

      <IonButtons slot="end">
        <IonButton fill="clear" size="large" data-cy="search-button" @click="$emit('open:search-modal')">
          <IonIcon :icon="searchOutline" />
        </IonButton>
        <div class="relative">
          <IonButton fill="clear" size="large" @click="handleRoute(route, router, '/checkout')">
            <IonIcon :icon="cartOutline" />
            <IonBadge v-if="checkoutStore.orderLength > 0" color="danger" class="-mt-4 -ml-2 rounded-4xl p-0.5">{{
              checkoutStore.orderLength
            }}</IonBadge>
          </IonButton>
          <CheckoutCounter />
        </div>

        <IonMenuButton data-cy="menu-button" />
      </IonButtons>

      <IonProgressBar v-if="loadingStore.loading" type="indeterminate" />
    </IonToolbar>
  </IonHeader>
</template>

<script setup lang="ts">
/* Imports */
import LogoComponent from '@/components/ui/LogoComponent.vue'
import { useCheckoutStore } from '@/stores/checkout'
import { useLoadingStore } from '@/stores/loading'
import handleRoute from '@/utils/handleRoute'
import { IonBadge, IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonProgressBar, IonToolbar } from '@ionic/vue'
import { cartOutline, searchOutline } from 'ionicons/icons'
import { useRoute, useRouter } from 'vue-router'
import CheckoutCounter from './CheckoutCounter.vue'

/* Props */
defineProps<{
  isScrolled: boolean
}>()

/* Constants */
const route = useRoute()
const router = useRouter()
const checkoutStore = useCheckoutStore()
const loadingStore = useLoadingStore()
</script>

<style lang="css" scoped>
ion-toolbar::part(background) {
  transition: background-color 0.2s !important;
}
</style>
