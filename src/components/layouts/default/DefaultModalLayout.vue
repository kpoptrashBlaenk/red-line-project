<template>
  <IonModal
    :is-open
    :initial-breakpoint="0.75"
    :breakpoints="[0, 0.75, 1]"
    @will-dismiss="$emit('close:search-modal')"
    :expand-to-scroll="false"
  >
    <IonContent color="light">
      <DefaultSearchContent @close:search-modal="$emit('close:search-modal')" />
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { IonContent, IonModal } from '@ionic/vue'
import DefaultSearchContent from './DefaultSearchContent.vue'
/* Props */
defineProps<{
  isOpen: boolean
}>()
</script>

<style lang="css" scoped>
ion-modal {
  --width: 100%;
}
</style>
