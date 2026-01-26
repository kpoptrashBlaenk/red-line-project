<template>
  <IonPage>
    <DefaultModalLayout :is-open="isOpenSearchModal" @close:search-modal="isOpenSearchModal = false" />

    <DefaultHeaderLayout :is-scrolled @open:search-modal="isOpenSearchModal = true" />

    <IonContent id="main-content" scroll-events @ion-scroll="handleScroll">
      <div class="h-full flex flex-col">
        <slot></slot>

        <DefaultFooter v-if="isDesktop()" class="mt-auto" />
      </div>
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
import DefaultModalLayout from './DefaultModalLayout.vue'

/* Refs */
const isScrolled = ref<boolean>(false)
const isOpenSearchModal = ref<boolean>(false)

/* Functions */
function handleScroll(event: CustomEvent) {
  isScrolled.value = event.detail.currentY !== 0
}
</script>
