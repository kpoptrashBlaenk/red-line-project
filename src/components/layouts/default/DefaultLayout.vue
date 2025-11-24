<template>
  <IonPage>
    <DefaultMenuLayout />

    <DefaultModalLayout />

    <DefaultHeaderLayout />

    <IonContent id="main-content" fullscreen>
      <slot></slot>

      <DefaultFooter v-if="isDesktop()" class="mt-10" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
/* Imports */
import isDesktop from '@/utils/isDesktop'
import { IonContent, IonPage } from '@ionic/vue'
import DefaultFooter from '../footer/DefaultFooter.vue'
import DefaultHeaderLayout from './DefaultHeaderLayout.vue'
import DefaultMenuLayout from './DefaultMenuLayout.vue'
import DefaultModalLayout from './DefaultModalLayout.vue'
</script>
