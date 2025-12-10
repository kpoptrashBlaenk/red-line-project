<template>
  <IonModal :is-open :initial-breakpoint="0.75" :breakpoints="[0, 0.75]" @will-dismiss="$emit('close:search-modal')">
    <IonContent color="light">
      <!-- Searchbar -->
      <IonSearchbar v-model="searchText" :placeholder="translation('search_product')" />

      <!-- Filters -->
      <div class="px-4 grid grid-cols-4">
        <DefaultSearchFilter
          :context="'category'"
          color="primary"
          :label="translation('categories')"
          chip-key="name"
          :items="categories"
        />
      </div>

      <!-- Filter Chips -->
      <div id="chips-row" class="col-span-4 mt-2 flex flex-wrap gap-2 px-2"></div>

      <!-- List -->
      <IonList class="bg-light">
        <!-- Item -->
        <SearchProductItem :search-text :products :categories :characteristics />
      </IonList>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
/* Imports */
import { Category, Characteristic, Product } from '$/types'
import SearchProductItem from '@/components/ui/items/SearchProductItem.vue'
import { useCategory } from '@/composables/category'
import { useCharacteristic } from '@/composables/characteristic'
import { useProduct } from '@/composables/product'
import translation from '@/utils/translation'
import { IonContent, IonList, IonModal, IonSearchbar } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import DefaultSearchFilter from './DefaultSearchFilter.vue'

/* Props */
defineProps<{
  isOpen: boolean
}>()

/* Constants */
const productComposable = useProduct()
const categoryComposable = useCategory()
const characteristicComposable = useCharacteristic()

/* Refs */
const searchText = ref<string>('')
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const characteristics = ref<Characteristic[]>([])

/* Lifecycle Hooks */
onMounted(async () => {
  products.value = await productComposable.get()
  categories.value = await categoryComposable.get()
  characteristics.value = await characteristicComposable.get()
})
</script>

<style lang="css" scoped>
ion-modal {
  --width: 100%;
}
</style>
