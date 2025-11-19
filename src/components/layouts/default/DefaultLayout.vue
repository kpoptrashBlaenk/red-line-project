<template>
  <DefaultMenuLayout />

  <DefaultModalLayout />

  <DefaultHeaderLayout />

  <IonContent id="main-content" fullscreen>
    <slot></slot>

    <DefaultFooter v-if="!getPlatforms().includes('desktop')" />
  </IonContent>
</template>

<script setup lang="ts">
/* Imports */
import { getPlatforms, IonContent } from '@ionic/vue'
import DefaultFooter from '../footer/DefaultFooter.vue'
import DefaultHeaderLayout from './DefaultHeaderLayout.vue'
import DefaultMenuLayout from './DefaultMenuLayout.vue'
import DefaultModalLayout from './DefaultModalLayout.vue'
</script>
