<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">
/* Imports */
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'
import { useCheckoutStore } from './stores/checkout'

/* Constants */
const checkoutStore = useCheckoutStore()

/* Lifecycle Hooks */
onMounted(() => {
  checkoutStore.restoreOrders()
})
</script>
