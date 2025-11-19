<template>
  <DefaultMenuLayout />

  <DefaultModalLayout />

  <DefaultHeaderLayout />

  <IonContent id="main-content" fullscreen>
    <slot></slot>
  </IonContent>
</template>

<script setup lang="ts">
/* Imports */
import { IonContent } from '@ionic/vue'
import DefaultHeaderLayout from './DefaultHeaderLayout.vue'
import DefaultMenuLayout from './DefaultMenuLayout.vue'
import DefaultModalLayout from './DefaultModalLayout.vue'
</script>
