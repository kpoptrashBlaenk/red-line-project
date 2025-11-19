<template>
  <IonPage>
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </IonPage>
</template>

<script setup lang="ts">
/* Imports */
import DefaultLayout from '@/components/layouts/default/DefaultLayout.vue'
import { IonPage } from '@ionic/vue'
</script>
