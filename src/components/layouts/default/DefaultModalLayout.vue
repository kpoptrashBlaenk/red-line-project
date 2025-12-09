<template>
  <IonModal :is-open :initial-breakpoint="0.75" :breakpoints="[0, 0.75]" @will-dismiss="$emit('close:search-modal')">
    <IonContent color="light">
      <!-- Searchbar -->
      <IonSearchbar v-model="searchText" :placeholder="translation('search_product')" />

      <!-- List -->
      <IonList class="bg-light">
        <!-- Item -->
        <SearchProductItem :search-text />
      </IonList>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import SearchProductItem from '@/components/ui/items/SearchProductItem.vue'
import translation from '@/utils/translation'
import { IonContent, IonList, IonModal, IonSearchbar } from '@ionic/vue'
import { ref } from 'vue'

/* Props */
defineProps<{
  isOpen: boolean
}>()

/* Refs */
const searchText = ref<string>('')
</script>

<style lang="css" scoped>
ion-modal {
  --width: 100%;
}
</style>
