<template>
  <IonModal :is-open :initial-breakpoint="0.75" :breakpoints="[0, 0.75]" @will-dismiss="$emit('close:search-modal')">
    <IonContent color="light">
      <!-- Searchbar -->
      <IonSearchbar placeholder="Search for products..." />

      <!-- List -->
      <IonList class="bg-light">
        <!-- Item -->
        <SearchProductItem />
      </IonList>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import SearchProductItem from '@/components/ui/items/SearchProductItem.vue'
import { IonContent, IonList, IonModal, IonSearchbar } from '@ionic/vue'

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
