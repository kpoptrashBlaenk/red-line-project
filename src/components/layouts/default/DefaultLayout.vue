<template>
  <IonPage>
    <DefaultMenuLayout />

    <DefaultModalLayout ref="searchModal" />

    <DefaultHeaderLayout :is-scrolled @open:search-modal="searchModal.$el.present()" />

    <IonContent id="main-content" ref="content" fullscreen scroll-events @ion-scroll="handleScroll">
      <slot></slot>

      <DefaultFooter v-if="isDesktop()" />
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
const searchModal = ref()

/* Functions */
function handleScroll(event: CustomEvent) {
  isScrolled.value = event.detail.currentY !== 0
}
</script>
