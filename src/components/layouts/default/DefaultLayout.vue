<template>
  <IonPage>
    <DefaultMenuLayout />

    <DefaultModalLayout />

    <DefaultHeaderLayout :is-scrolled />

    <IonContent id="main-content" ref="content" fullscreen scroll-events @ion-scroll="handleScroll">
      <slot></slot>

      <DefaultFooter v-if="isDesktop()" class="mt-10" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
/* Imports */
import isDesktop from '@/utils/isDesktop'
import { IonContent, IonPage } from '@ionic/vue'
import { ref } from 'vue'
import DefaultFooter from '../footer/DefaultFooter.vue'
import DefaultHeaderLayout from './DefaultHeaderLayout.vue'
import DefaultMenuLayout from './DefaultMenuLayout.vue'
import DefaultModalLayout from './DefaultModalLayout.vue'

/* Refs */
const isScrolled = ref<boolean>(false)

/* Functions */
function handleScroll(event: CustomEvent) {
  isScrolled.value = event.detail.currentY !== 0
}
</script>
